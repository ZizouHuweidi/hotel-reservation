import { knex } from "../utils/db";
import { Guest } from "../models/guest.model";

export class GuestService {
  static async getAllGuests(): Promise<Guest[]> {
    return knex("guests").select("*");
  }

  static async getGuestsPaginated(
    page: number,
    limit: number,
  ): Promise<{ data: Guest[]; total: any }> {
    const offset = (page - 1) * limit;
    const total = await knex("guests").count("id as total").first();
    const guests = await knex("guests").limit(limit).offset(offset).select("*");
    return { data: guests, total: total?.total || 0 };
  }

  static async getGuestById(id: number): Promise<Guest | undefined> {
    return knex("guests").where({ id }).first();
  }

  static async createGuest(guest: Guest): Promise<Guest> {
    const existingGuest = await knex("guests")
      .where("email", guest.email)
      .orWhere("phone", guest.phone)
      .first();

    if (existingGuest) {
      throw new Error("Email or phone number already exists");
    }

    const [newGuest] = await knex("guests").insert(guest).returning("*");
    return newGuest;
  }

  static async updateGuest(
    id: number,
    guest: Partial<Guest>,
  ): Promise<Guest | undefined> {
    const existingGuest = await knex("guests")
      .where(function () {
        this.where("email", guest.email).orWhere("phone", guest.phone);
      })
      .andWhere("id", "!=", id)
      .first();

    if (existingGuest) {
      throw new Error("Email or phone number already exists");
    }

    const [updatedGuest] = await knex("guests")
      .where({ id })
      .update(guest)
      .returning("*");
    return updatedGuest;
  }

}
