import { Type, Static } from "@sinclair/typebox";

export const GuestSchema = Type.Object({
  name: Type.String({ minLength: 1, maxLength: 255 }),
  email: Type.String({ minLength: 5, maxLength: 255 }), // Ensures email format
  phone: Type.String({ minLength: 8, maxLength: 18 }), // Ensures phone number format
});

export type Guest = Static<typeof GuestSchema>;
