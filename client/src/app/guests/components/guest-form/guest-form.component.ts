import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GuestService } from '../../services/guest.service';
import { Guest } from '../../models/guest.model';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { NgIf } from '@angular/common'; // Optional: For conditional rendering

@Component({
  selector: 'app-guest-form',
  templateUrl: './guest-form.component.html',
  standalone: true, // Mark as standalone
  imports: [FormsModule, NgIf], // Include FormsModule here
})
export class GuestFormComponent {
  guest: Partial<Guest> = {};

  constructor(private guestService: GuestService, private router: Router) { }

  saveGuest(): void {
    this.guestService.createGuest(this.guest).subscribe(() => {
      this.router.navigate(['/guests']);
    });
  }
}