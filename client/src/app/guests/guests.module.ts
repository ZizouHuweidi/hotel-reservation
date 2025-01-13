import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // For ngModel
import { RouterModule } from '@angular/router'; // For routerLink

import { GuestsRoutingModule } from './guests-routing.module';
import { GuestListComponent } from './components/guest-list/guest-list.component';
import { GuestFormComponent } from './components/guest-form/guest-form.component';
import { GuestDetailsComponent } from './components/guest-details/guest-details.component';
import { GuestsComponent } from './guests.component';

@NgModule({
  // declarations: [GuestsComponent],
  imports: [
    GuestsComponent,
    CommonModule,
    FormsModule,
    RouterModule,
    GuestsRoutingModule,
    GuestListComponent, // Import standalone components
    GuestFormComponent, // Import standalone components
    GuestDetailsComponent, // Import standalone components
  ],
})
export class GuestsModule { }
