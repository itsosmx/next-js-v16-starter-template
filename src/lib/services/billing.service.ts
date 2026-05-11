import { Payment } from "dodopayments/resources/payments.mjs";
import { Subscription } from "dodopayments/resources/subscriptions.mjs";
import { prisma } from "../prisma";

export async function paymentSucceeded(payload: Payment) {
  try {

    // await prisma.billing.upsert({
    //   where: {
    //     organizationId: payload.metadata?.organizationId!,
    //   },
    //   update: {
    //     paymentsSubscriptionId: payload.subscription_id,
    //     paymentsSubscriptionStatus: payload.status,
    //     paymentsPaymentId: payload.payment_id,
    //   },
    //   create: {
    //     organizationId: payload.metadata?.organizationId!,
    //     paymentsSubscriptionId: payload.subscription_id,
    //     paymentsSubscriptionStatus: payload.status,
    //     paymentsPaymentId: payload.payment_id,
    //   },

    // })

  } catch (error) {
    console.error("Error handling payment succeeded webhook:", error);
  }
}

export async function subscriptionUpdated(payload: Subscription) {
  try {

    // if (payload.status === "cancelled" && !payload.cancel_at_next_billing_date) {
    //   await prisma.billing.delete({
    //     where: { organizationId: payload.metadata?.organizationId! },
    //   })
    //   return;
    // }

    // await prisma.billing.upsert({
    //   where: {
    //     organizationId: payload.metadata?.organizationId!,
    //   },
    //   update: {
    //     paymentsSubscriptionId: payload.subscription_id,
    //     paymentsSubscriptionStatus: payload.status,
    //   },
    //   create: {
    //     organizationId: payload.metadata?.organizationId!,
    //     paymentsSubscriptionId: payload.subscription_id,
    //     paymentsSubscriptionStatus: payload.status,
    //   },
    // });

  } catch (error) {
    console.error("Error handling subscription updated webhook:", error);
  }
}

export async function subscriptionCancelled(payload: Subscription) {
  try {

    // await prisma.billing.delete({
    //   where: { organizationId: payload.metadata?.organizationId! },
    // });

  } catch (error) {
    console.error("Error handling subscription cancelled webhook:", error);
  }
}