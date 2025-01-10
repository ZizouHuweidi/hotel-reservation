# Hotel Reservation System

A full-stack application for managing hotel reservations. This system provides features for managing guests, rooms, and reservations efficiently, with advanced functionality like validation, calendar views, and conflict detection.

---

## Features

### Guests Management
- View a paginated list of guests.
- View guest details, including:
  - Total past reservations.
  - Upcoming reservations (with room details).
- Add and edit guest information (name, email, phone).

### Rooms Management
- View a paginated and sortable list of rooms.
- View room details, including:
  - Current reservations.
  - Upcoming reservations.
- Add and edit room information (room number, name).

### Reservations Management
- View a paginated list of reservations, including guest names and room numbers.
- View a calendar of reservations with busy days highlighted.
- Add reservations with:
  - Validation for overlapping bookings.
  - Date range validation (no past or invalid dates).
- Cancel reservations to free up rooms.

---

## Tech Stack
- **Backend:** Node.js, Express.js, Knex.js, PostgreSQL.
- **Frontend:** Angular, Taiga UI, Tailwind CSS.
- **Deployment:** Docker and Docker Compose.

---

## Setup and Usage

### 1. Prerequisites
- **Docker and Docker Compose:** [Install Docker](https://docs.docker.com/get-docker/).
- **Make:** Ensure `make` is installed (standard on Unix/Linux systems; install via [Chocolatey](https://chocolatey.org/) or [Homebrew](https://brew.sh/) on Windows/Mac).
- **Node.js:** Version 18+ ([Download Node.js](https://nodejs.org/)).

---

### 2. Clone the Repository
```bash
git clone https://github.com/ZizouHuweidi/hotel-reservation.git
cd hotel-reservation
```

### 3. Running the Project

The `Makefile` automates the setup and management of the backend API.

#### Build the Docker Images
```bash
make build
```

#### Start the API
```bash
make up
```

This will start the backend API and the PostgreSQL database in Docker containers.

#### Stop the Application
```bash
make down
```

#### Run Database Migrations
```bash
make migrate
```

#### Seed the Database
```bash
make seed
```

### 4. Testing the API
Use the examples below to test the API using curl.

#### 1. Guests Management
Get Paginated List of Guests

```bash
curl -X GET http://localhost:5000/api/guests?page=1&limit=10
```

Get Details of a Guest
```bash
curl -X GET http://localhost:5000/api/guests/1
```

Create a New Guest
```bash
curl -X POST http://localhost:5000/api/guests \
-H "Content-Type: application/json" \
-d '{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "1234567890"
}'
```

Update a Guest
```bash
curl -X PUT http://localhost:5000/api/guests/1 \
-H "Content-Type: application/json" \
-d '{
  "name": "Johnathan Doe",
  "email": "john.doe@example.com",
  "phone": "9876543210"
}'
```


#### 2. Rooms Management
Get Paginated List of Rooms
```bash
curl -X GET http://localhost:5000/api/rooms?page=1&limit=10&sortBy=number
```


Get Details of a Room
```bash
curl -X GET http://localhost:5000/api/rooms/1
```

Create a New Room
```bash
curl -X POST http://localhost:5000/api/rooms \
-H "Content-Type: application/json" \
-d '{
  "number": "101",
  "name": "Deluxe Room"
}'
```

Update a Room
```bash
curl -X PUT http://localhost:5000/api/rooms/1 \
-H "Content-Type: application/json" \
-d '{
  "name": "Deluxe Suite",
  "number": "101A"
}'
```


#### 3. Reservations Management
Get Paginated List of Reservations
```bash
curl -X GET http://localhost:5000/api/reservations?page=1&limit=10
```

Create a Reservation
```bash
curl -X POST http://localhost:5000/api/reservations \
-H "Content-Type: application/json" \
-d '{
  "guest_id": 1,
  "room_id": 1,
  "start_date": "2025-01-10",
  "end_date": "2025-01-15"
}'
```

Cancel a Reservation
```bash
curl -X DELETE http://localhost:5000/api/reservations/1
```

### Development Tips

#### Access Logs

Check the logs for the backend container:

```bash
docker logs hotel-backend
```

#### Debugging Database
Access the PostgreSQL database:

```bash
docker exec -it hotel-db psql -U postgres -d hotel_reservation
```

### Troubleshooting

- Ensure Docker is running and that ports 5000 (API) and 5432 (PostgreSQL) are free.

- Database Connection Issues? Verify the .env file contains correct database credentials.