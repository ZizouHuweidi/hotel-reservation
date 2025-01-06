# hotel-reservation

# Hotel Reservation System

A full-stack application for managing hotel reservations. This system allows users to manage guests, rooms, and reservations efficiently, with features like pagination, calendar views, and validation.

---

## Features

- **Guests Management:**
  - View a paginated list of guests.
  - View guest details, including total past reservations.
  - Add and edit guest information (name, email, phone).
  
- **Rooms Management:**
  - View a paginated and sortable list of rooms.
  - View room details, including current and upcoming reservations.
  - Add and edit room information (room number, name).

- **Reservations Management:**
  - View a paginated list of reservations.
  - View a calendar of reservations with busy days highlighted.
  - Add reservations with validation to prevent overlapping bookings.
  - Cancel reservations to free up rooms.

- **Tech Stack:**
  - **Frontend:** Angular, Taiga UI, Tailwind CSS.
  - **Backend:** Node.js, Express.js, Knex.js, PostgreSQL.
  - **Deployment:** Docker and Docker Compose.

---

## Project Setup

### Prerequisites

1. **Install Docker:**
   - [Docker Desktop](https://www.docker.com/products/docker-desktop) for Windows/Mac.
   - `docker` and `docker-compose` for Linux.
2. **Install Node.js:** Version 18+ ([Download Node.js](https://nodejs.org/)).

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ZizouHuweidi/hotel-reservation.git
cd hotel-reservation
```

### 2. Start the Application