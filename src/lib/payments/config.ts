export const RAZORPAY_KEY_ID =
  process.env.RAZORPAY_KEY_ID ?? process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "";
export const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET ?? "";
export const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET ?? "";

/** Public key id exposed to the browser checkout. */
export const PUBLIC_RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "";

/** True when real Razorpay keys are present. */
export const isRazorpayConfigured = Boolean(RAZORPAY_KEY_ID && RAZORPAY_KEY_SECRET);

/** Live vs test is inferred from the key prefix (rzp_live_ / rzp_test_). */
export const isRazorpayLive = RAZORPAY_KEY_ID.startsWith("rzp_live_");

/** Deposit percentage when a customer chooses to "reserve with a deposit". */
export const DEPOSIT_PERCENT = 20;

export function depositAmount(total: number) {
  return Math.round((total * DEPOSIT_PERCENT) / 100);
}
