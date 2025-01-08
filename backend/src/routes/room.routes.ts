import { Router } from "express";
import {
  getRoomsPaginated,
  getRoomDetails,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../controllers/room.controller";

export const roomRoutes = Router();

/**
 * GET /api/rooms?page=1&limit=10&sortBy=reservations|number|name
 * Fetch paginated and sortable list of rooms.
 */
roomRoutes.get("/", getRoomsPaginated);

/**
 * GET /api/rooms/:id
 * Fetch details of a specific room, including current and upcoming reservations.
 */
roomRoutes.get("/:id", getRoomDetails);

/**
 * POST /api/rooms
 * Create a new room.
 */
roomRoutes.post("/", createRoom);

/**
 * PUT /api/rooms/:id
 * Update an existing room.
 */
roomRoutes.put("/:id", updateRoom);
