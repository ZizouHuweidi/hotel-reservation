import { Router } from "express";
import {
  getGuestsPaginated,
  getGuestDetails,
  createGuest,
  updateGuest,
} from "../controllers/guest.controller";

export const guestRoutes = Router();

/**
 * GET /api/guests?page=1&limit=10
 * Fetch paginated list of guests.
 */
guestRoutes.get("/", getGuestsPaginated);

/**
 * GET /api/guests/:id
 * Fetch details of a specific guest, including total past reservations and upcoming reservations.
 */
guestRoutes.get("/:id", getGuestDetails);

/**
 * POST /api/guests
 * Create a new guest.
 */
guestRoutes.post("/", createGuest);

/**
 * PUT /api/guests/:id
 * Update an existing guest.
 */
guestRoutes.put("/:id", updateGuest);
