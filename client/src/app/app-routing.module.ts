import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'guests', loadChildren: () => import('./guests/guests.module').then(m => m.GuestsModule) },
{ path: 'rooms', loadChildren: () => import('./rooms/rooms.module').then(m => m.RoomsModule) }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
