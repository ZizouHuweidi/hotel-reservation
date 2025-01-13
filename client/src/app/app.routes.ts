import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'guests', loadChildren: () => import('./guests/guests.module').then(m => m.GuestsModule) },
    { path: 'rooms', loadChildren: () => import('./rooms/rooms.module').then(m => m.RoomsModule) },
    // { path: 'reservations', loadChildren: () => import('./reservations/reservations.module').then(m => m.ReservationsModule) },
    { path: '', redirectTo: '/', pathMatch: 'full' },
];