import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestListComponent } from './components/guest-list/guest-list.component';
import { GuestFormComponent } from './components/guest-form/guest-form.component';
import { GuestDetailsComponent } from './components/guest-details/guest-details.component';

const routes: Routes = [
  { path: '', component: GuestListComponent }, // Default route: Guest List
  { path: 'add', component: GuestFormComponent }, // Add a new guest
  { path: ':id', component: GuestDetailsComponent }, // View guest details
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestsRoutingModule { }
