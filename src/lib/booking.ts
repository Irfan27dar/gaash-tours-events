import { z } from "zod";

export const bookingSchema = z.object({
  packageSlug: z.string().min(1),
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z
    .string()
    .min(7, "Enter a valid phone number")
    .regex(/^[0-9+\-\s()]+$/, "Enter a valid phone number"),
  travelDate: z.string().optional(),
  travellers: z.coerce.number().int().min(1).max(30).default(2),
  paymentOption: z.enum(["full", "deposit"]).default("full"),
  notes: z.string().max(1000).optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;
