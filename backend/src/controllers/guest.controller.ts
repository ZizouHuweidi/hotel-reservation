import { Request, Response } from "express";
import { GuestService } from "../services/guest.service";
import { validate } from "../utils/validation";
import { GuestSchema, Guest } from "../models/guest.model";

export const getGuests = async (req: Request, res: Response) => {
  try {
    const guests = await GuestService.getAllGuests();
    res.status(200).json(guests);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving guests", error });
  }
};

export const getGuestById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const guest = await GuestService.getGuestById(Number(id));
    if (!guest) {
      res.status(404).json({ message: "Guest not found" });
    } else {
      res.status(200).json(guest);
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const createGuest = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const guestData = validate<Guest>(GuestSchema, req.body);
    const guest = await GuestService.createGuest(guestData);
    res.status(201).json(guest);
  } catch (error) {
    if ((error as Error).message.includes("already exists")) {
      res.status(400).json({ error: (error as Error).message });
    } else {
      res.status(500).json({ error: (error as Error).message });
    }
  }
};

export const updateGuest = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const guestData = validate<Guest>(GuestSchema, req.body);
    const guest = await GuestService.updateGuest(Number(id), guestData);
    if (!guest) {
      res.status(404).json({ message: "Guest not found" });
    } else {
      res.status(200).json(guest);
    }
  } catch (error) {
    if ((error as Error).message.includes("already exists")) {
      res.status(400).json({ error: (error as Error).message });
    } else {
      res.status(500).json({ error: (error as Error).message });
    }
  }
};
