import { Router } from "express";
import {
  getReservationsPaginated,
  getReservationsForMonth,
  createReservation,
  cancelReservation,
} from "../controllers/reservation.controller";

export const reservationRoutes = Router();

/**
 * GET /api/reservations?page=1&limit=10
 * Fetch paginated list of reservations, sorted by most recent, with guest name and room number included.
 */
reservationRoutes.get("/", getReservationsPaginated);

/**
 * GET /api/reservations/calendar?year=2024&month=12
 * Fetch reservations for a specific month with daily counts.
 */
reservationRoutes.get('/calendar', getReservationsForMonth);

/**
 * POST /api/reservations
 * Create a new reservation.
 */
reservationRoutes.post("/", createReservation);

/**
 * DELETE /api/reservations/:id
 * Cancel a reservation.
 */
reservationRoutes.delete("/:id", cancelReservation);
