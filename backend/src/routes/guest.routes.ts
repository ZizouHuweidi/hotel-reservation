import { Router } from 'express';
import { getGuests, getGuestById, createGuest, updateGuest } from '../controllers/guest.controller';

export const guestRoutes = Router();

guestRoutes.get('/', getGuests);
guestRoutes.get('/:id', getGuestById);
guestRoutes.post('/', createGuest);
guestRoutes.put('/:id', updateGuest);


