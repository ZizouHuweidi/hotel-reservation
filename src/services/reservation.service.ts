import { knex } from "../utils/db";
import { Reservation } from "../models/reservation.model";
import { isBefore, parseISO } from 'date-fns';


export class ReservationService {
  static async getAllReservations(): Promise<Reservation[]> {
    return knex("reservations").select("*").orderBy("start_date");
  }

  static async getReservationsPaginated(
    page: number,
    limit: number
  ): Promise<{ data: any[]; total: any }> {
    const offset = (page - 1) * limit;

    // Get total number of reservations
    const total = await knex('reservations').count('id as total').first();

    // Fetch paginated reservations with room number and guest name
    const data = await knex('reservations')
      .join('guests', 'reservations.guest_id', 'guests.id')
      .join('rooms', 'reservations.room_id', 'rooms.id')
      .select(
        'reservations.*',
        'guests.name as guest_name',
        'rooms.number as room_number'
      )
      .orderBy('reservations.start_date', 'desc')
      .limit(limit)
      .offset(offset);

    return { data, total: total?.total || 0 };
  }


  static async getPastReservationsForGuest(guestId: number): Promise<any> {
    const result = await knex("reservations")
      .where("guest_id", guestId)
      .andWhere("end_date", "<", knex.fn.now())
      .count("id as total")
      .first();
    return result?.total || 0;
  }

  static async getUpcomingReservationsForGuest(guestId: number): Promise<any[]> {
    return knex('reservations')
      .join('rooms', 'reservations.room_id', 'rooms.id')
      .where('guest_id', guestId)
      .andWhere('start_date', '>=', knex.fn.now())
      .select(
        'reservations.id',
        'reservations.start_date',
        'reservations.end_date',
        'rooms.number as room_number',
        'rooms.name as room_name'
      )
      .orderBy('reservations.start_date', 'asc');
  }

  static async getReservationsForMonth(
    year: number,
    month: number,
  ): Promise<any> {
    const results = await knex("reservations")
      .whereRaw("EXTRACT(YEAR FROM start_date) = ?", [year])
      .andWhereRaw("EXTRACT(MONTH FROM start_date) = ?", [month])
      .select("start_date")
      .count("id as total")
      .groupBy("start_date");

    return results.reduce(
      (acc, row) => {
        acc[row.start_date] = row.total;
        return acc;
      },
      {} as { [date: string]: number },
    );
  }

  static async createReservation(reservation: Reservation): Promise<Reservation> {
    return knex.transaction(async (trx) => {
      const { start_date, end_date, room_id } = reservation;

      // Parse dates to validate them
      const startDate = parseISO(start_date);
      const endDate = parseISO(end_date);
      const today = new Date();

      // Validation: No past dates
      if (isBefore(startDate, today) || isBefore(endDate, today)) {
        throw new Error('Reservation dates cannot be in the past');
      }

      // Validation: Valid date range
      if (isBefore(endDate, startDate)) {
        throw new Error('End date must be on or after the start date');
      }

      // Check for overlapping reservations
      const conflicting = await trx('reservations')
        .where('room_id', room_id)
        .andWhere((builder) =>
          builder
            .whereBetween('start_date', [start_date, end_date])
            .orWhereBetween('end_date', [start_date, end_date])
        )
        .first();

      if (conflicting) {
        throw new Error('Room is already booked for the selected dates');
      }

      // Create the reservation
      const [newReservation] = await trx('reservations').insert(reservation).returning('*');
      return newReservation;
    });
  }


  static async cancelReservation(id: number): Promise<void> {
    await knex("reservations").where({ id }).del();
  }
}
