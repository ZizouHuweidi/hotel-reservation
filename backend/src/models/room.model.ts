import { Type, Static } from "@sinclair/typebox";

export const RoomSchema = Type.Object({
  number: Type.String({ maxLength: 10 }),
  name: Type.String({ minLength: 1, maxLength: 255 }),
});

export type Room = Static<typeof RoomSchema>;
