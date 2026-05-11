import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { nextCookies } from "better-auth/next-js";
import { headers } from "next/headers";
import { organization } from "better-auth/plugins"
import { newUserNotification, paymentEvent, sendDiscordNotification } from "./services/discord.service";
import {
  dodopayments,
  portal as dodopaymentsPortal,
  webhooks as dodopaymentsWebhooks
} from "@dodopayments/better-auth";
import { dodoPaymentsClient } from "./dodopayment-client";
import { paymentSucceeded, subscriptionCancelled, subscriptionUpdated } from "./services/billing.service";
import resend from "./resend-client";


export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET as string,
  baseURL: process.env.BASE_URL as string,
  advanced: {
    database: {
      generateId: false,
    },
    cookiePrefix: process.env.COOKIE_PREFIX as string,
  },
  // user: {
  //   additionalFields: {
  //     boarded: { type: "boolean", default: false, required: false },
  //     boardedAt: { type: "date", required: false },
  //     referralCode: { type: "string", required: false },
  //     referredByCode: { type: "string", required: false },
  //     dodoPaymentsCustomerId: { type: "string", required: false },
  //   }
  // },
  onAPIError: {
    errorURL: "/signin",
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user, ctx) => {
          try {
            await newUserNotification({ name: user.name || "N/A", email: user.email!, id: user.id });
            // await resend.contacts.create({
            //   email: user.email!,
            //   firstName: user.name || undefined,
            // })
          } catch (error) {
            console.error("Failed to send Discord notification for new user:", error);
          }
        }
      }
    }
  },
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      enabled: true,
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      prompt: "select_account"
    }
  },
  plugins: [
    organization(),
    dodopayments({
      createCustomerOnSignUp: true,
      client: dodoPaymentsClient,
      use: [dodopaymentsPortal(), dodopaymentsWebhooks({
        webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_SECRET!,
        async onPayload(payload) {
          switch (payload.type) {
            case "payment.succeeded": {
              const payment = payload.data as any;
              await paymentSucceeded(payment);
              break;
            }
            case "subscription.updated": {
              const subscription = payload.data as any;
              await subscriptionUpdated(subscription);
              break;
            }
            case "subscription.cancelled": {
              const subscription = payload.data as any;
              await subscriptionCancelled(subscription);
              break;
            }
            default:
              break;
          }
          try {
            const data = payload.data as any;
            await paymentEvent({
              type: payload.type,
              id: data.id,
              status: data.status,
            });
          } catch (error) {
            console.error("Failed to send Discord notification for payment event:", error);
          }
        },


      })]
    }),
    nextCookies(),
  ]
});


export async function getCurrentUser(_headers?: Headers) {
  const response = await auth.api.getSession({
    headers: _headers ?? await headers()
  });

  return response?.user ?? null;
}

export async function getAuth(_headers?: Headers) {
  const response = await auth.api.getSession({
    headers: _headers ?? await headers()
  });

  return response ?? null;
}


