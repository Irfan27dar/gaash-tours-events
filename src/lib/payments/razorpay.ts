import Razorpay from "razorpay";
import { createHmac } from "node:crypto";
import type { CreateOrderInput, CreatedOrder, PaymentProvider, VerifyInput } from "./types";
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, PUBLIC_RAZORPAY_KEY_ID } from "./config";

/** Razorpay implementation of the payment provider. Server-only. */
export class RazorpayProvider implements PaymentProvider {
  readonly name = "razorpay";
  readonly mock = false;
  private client: Razorpay;

  constructor() {
    this.client = new Razorpay({ key_id: RAZORPAY_KEY_ID, key_secret: RAZORPAY_KEY_SECRET });
  }

  async createOrder(input: CreateOrderInput): Promise<CreatedOrder> {
    const order = await this.client.orders.create({
      amount: Math.round(input.amount * 100), // paise
      currency: input.currency,
      receipt: input.receipt,
      notes: input.notes,
    });
    return {
      provider: this.name,
      orderId: order.id,
      amount: input.amount,
      currency: input.currency,
      keyId: PUBLIC_RAZORPAY_KEY_ID || RAZORPAY_KEY_ID,
    };
  }

  verifySignature({ orderId, paymentId, signature }: VerifyInput): boolean {
    const expected = createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");
    // Constant-time-ish compare
    return expected.length === signature.length && expected === signature;
  }
}
