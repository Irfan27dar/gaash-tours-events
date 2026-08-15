import type { PaymentProvider } from "./types";
import { RazorpayProvider } from "./razorpay";
import { MockProvider } from "./mock";
import { isRazorpayConfigured } from "./config";

export * from "./types";
export { isRazorpayConfigured, isRazorpayLive, DEPOSIT_PERCENT, depositAmount } from "./config";

/** Returns the active payment provider — Razorpay when configured, else mock. */
export function getPaymentProvider(): PaymentProvider {
  return isRazorpayConfigured ? new RazorpayProvider() : new MockProvider();
}
