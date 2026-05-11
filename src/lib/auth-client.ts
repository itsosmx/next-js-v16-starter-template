import { nextCookies } from "better-auth/next-js"
import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields, organizationClient } from "better-auth/client/plugins";
import { dodopaymentsClient } from "@dodopayments/better-auth";

export const authClient = createAuthClient({
  baseURL: process.env.BASE_URL as string,
  plugins: [
    organizationClient(),
    dodopaymentsClient(),
    // inferAdditionalFields({
    //   user: {
    //     boarded: { type: "boolean", default: false, required: false },
    //     boardedAt: { type: "date", required: false },
    //     referralCode: { type: "string", required: false },
    //     referredByCode: { type: "string", required: false },
    //   }
    // }),
    nextCookies(),
  ]
})

export const { signIn, signUp, signOut, useSession } = authClient

