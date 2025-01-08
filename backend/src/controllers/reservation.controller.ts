import { Request, Response } from "express";
import { validate } from "../utils/validation";
import { ReservationSchema, Reservation } from "../models/reservation.model";
import { ReservationService } from "../services/reservation.service";

export const getReservations = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const reservations = await ReservationService.getAllReservations();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getReservationsPaginated = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const reservations = await ReservationService.getReservationsPaginated(
      Number(page),
      Number(limit)
    );
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getReservationsForMonth = async (req: Request, res: Response): Promise<void> => {
  try {
    const { year, month } = req.query;
    const reservations = await ReservationService.getReservationsForMonth(
      Number(year),
      Number(month)
    );
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

export const createReservation = async (req: Request, res: Response): Promise<void> => {
  try {
    const reservationData = validate<Reservation>(ReservationSchema, req.body);
    const reservation = await ReservationService.createReservation(reservationData);
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};


export const cancelReservation = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    await ReservationService.cancelReservation(Number(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
