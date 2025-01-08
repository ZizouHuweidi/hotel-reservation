import { Request, Response } from "express";
import { validate } from "../utils/validation";
import { RoomSchema, Room } from "../models/room.model";
import { RoomService } from "../services/room.service";

export const getRooms = async (_req: Request, res: Response): Promise<void> => {
  try {
    const rooms = await RoomService.getAllRooms();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getRoomsPaginated = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { page = 1, limit = 10, sortBy } = req.query;
    const rooms = await RoomService.getRoomsPaginated(
      Number(page),
      Number(limit),
      String(sortBy),
    );
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getRoomById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const room = await RoomService.getRoomById(Number(id));
    if (!room) {
      res.status(404).json({ message: "Room not found" });
    } else {
      res.status(200).json(room);
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getRoomDetails = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const room = await RoomService.getRoomById(Number(id));
    if (!room) {
      res.status(404).json({ message: "Room not found" });
      return;
    }

    const { current, upcoming } = await RoomService.getRoomReservations(
      Number(id),
    );
    res.status(200).json({
      ...room,
      currentReservation: current,
      upcomingReservations: upcoming,
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const createRoom = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const roomData = validate<Room>(RoomSchema, req.body);
    const room = await RoomService.createRoom(roomData);
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const updateRoom = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const roomData = validate<Partial<Room>>(RoomSchema, req.body);
    const room = await RoomService.updateRoom(Number(id), roomData);
    if (!room) {
      res.status(404).json({ message: "Room not found" });
    } else {
      res.status(200).json(room);
    }
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const deleteRoom = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    await RoomService.deleteRoom(Number(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
