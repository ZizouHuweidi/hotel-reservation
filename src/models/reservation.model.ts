import { Type, Static } from "@sinclair/typebox";

export const ReservationSchema = Type.Object({
  guest_id: Type.Integer(),
  room_id: Type.Integer(),
  start_date: Type.String(),
  end_date: Type.String(),
});

export type Reservation = Static<typeof ReservationSchema>;
