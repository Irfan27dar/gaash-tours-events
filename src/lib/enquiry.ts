import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z
    .string()
    .min(7, "Enter a valid phone number")
    .regex(/^[0-9+\-\s()]+$/, "Enter a valid phone number"),
  destination: z.string().min(1, "Please choose a destination"),
  travellers: z.string().optional(),
  date: z.string().optional(),
  packageSlug: z.string().optional(),
  message: z.string().max(1000).optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
