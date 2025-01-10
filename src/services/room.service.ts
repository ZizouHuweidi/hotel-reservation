import { knex } from "../utils/db";
import { Room } from "../models/room.model";
import { Reservation } from "../models/reservation.model";

export class RoomService {
  static async getAllRooms(): Promise<Room[]> {
    return knex("rooms").select("*").orderBy("number");
  }

  static async getRoomsPaginated(
    page: number,
    limit: number,
    sortBy?: string,
  ): Promise<{ data: Room[]; total: any }> {
    const offset = (page - 1) * limit;

    let query = knex("rooms").select("*");
    if (sortBy === "reservations") {
      query = query
        .leftJoin("reservations", "rooms.id", "reservations.room_id")
        .groupBy("rooms.id")
        .orderByRaw("COUNT(reservations.id) DESC");
    } else if (sortBy === "number" || sortBy === "name") {
      query = query.orderBy(sortBy);
    }

    const total = await knex("rooms").count("id as total").first();
    const data = await query.limit(limit).offset(offset);
    return { data, total: total?.total || 0 };
  }

  static async getRoomById(id: number): Promise<Room | undefined> {
    return knex("rooms").where({ id }).first();
  }

  static async getRoomReservations(
    roomId: number,
  ): Promise<{ current: Reservation | null; upcoming: Reservation[] }> {
    const current = await knex("reservations")
      .where("room_id", roomId)
      .andWhere("start_date", "<=", knex.fn.now())
      .andWhere("end_date", ">=", knex.fn.now())
      .first();

    const upcoming = await knex("reservations")
      .where("room_id", roomId)
      .andWhere("start_date", ">", knex.fn.now())
      .orderBy("start_date");

    return { current, upcoming };
  }

  static async createRoom(room: Room): Promise<Room> {
    const [newRoom] = await knex("rooms").insert(room).returning("*");
    return newRoom;
  }

  static async updateRoom(
    id: number,
    room: Partial<Room>,
  ): Promise<Room | undefined> {
    const [updatedRoom] = await knex("rooms")
      .where({ id })
      .update(room)
      .returning("*");
    return updatedRoom;
  }

  static async deleteRoom(id: number): Promise<void> {
    await knex("rooms").where({ id }).del();
  }
}
