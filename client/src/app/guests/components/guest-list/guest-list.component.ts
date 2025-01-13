import { Component, OnInit } from '@angular/core';
import { GuestService } from '../../services/guest.service';
import { Guest } from '../../models/guest.model';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { NgFor } from '@angular/common'; // For *ngFor


@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  standalone: true,
  imports: [RouterModule, NgFor], // Include RouterModule here

})
export class GuestListComponent implements OnInit {
  guests: Guest[] = [];

  constructor(private guestService: GuestService) { }

  ngOnInit(): void {
    this.loadGuests();
  }

  loadGuests(): void {
    this.guestService.getGuests().subscribe((data) => {
      this.guests = data;
    });
  }
}
