import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GuestService } from '../../services/guest.service';

@Component({
  selector: 'app-guest-details',
  templateUrl: './guest-details.component.html',
  styleUrls: ['./guest-details.component.css'],
  standalone: true,
})
export class GuestDetailsComponent implements OnInit {
  guest: any = null; // Holds guest details
  isLoading = true; // Loading indicator
  errorMessage = ''; // Error message

  constructor(
    private guestService: GuestService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const guestId = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchGuestDetails(guestId);
  }

  fetchGuestDetails(id: number): void {
    this.guestService.getGuestDetails(id).subscribe(
      (data) => {
        this.guest = data;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load guest details.';
        this.isLoading = false;
      }
    );
  }
}
