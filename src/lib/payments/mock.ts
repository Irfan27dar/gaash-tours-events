import { randomUUID } from "node:crypto";
import type { CreateOrderInput, CreatedOrder, PaymentProvider } from "./types";

/**
 * Mock provider used when no real gateway keys are set. Lets the entire
 * booking UX be demoed end-to-end; "payment" is simulated client-side and
 * always verifies. Bookings are still recorded in the database.
 */
export class MockProvider implements PaymentProvider {
  readonly name = "mock";
  readonly mock = true;

  async createOrder(input: CreateOrderInput): Promise<CreatedOrder> {
    return {
      provider: this.name,
      orderId: `mock_order_${randomUUID().slice(0, 12)}`,
      amount: input.amount,
      currency: input.currency,
      mock: true,
    };
  }

  verifySignature(): boolean {
    return true;
  }
}
