// Provider-agnostic payment contracts so Razorpay can be swapped for Stripe etc.

export type CreateOrderInput = {
  amount: number; // in major units (₹), converted to paise inside the provider
  currency: string; // "INR"
  receipt: string; // our booking reference
  notes?: Record<string, string>;
};

export type CreatedOrder = {
  provider: string;
  orderId: string;
  amount: number; // major units
  currency: string;
  keyId?: string; // public key id for the client checkout
  mock?: boolean; // true when running without real gateway keys
};

export type VerifyInput = {
  orderId: string;
  paymentId: string;
  signature: string;
};

export interface PaymentProvider {
  readonly name: string;
  readonly mock: boolean;
  createOrder(input: CreateOrderInput): Promise<CreatedOrder>;
  verifySignature(input: VerifyInput): boolean;
}
