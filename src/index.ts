import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { guestRoutes } from "./routes/guest.routes";
import { roomRoutes } from "./routes/room.routes";
import { reservationRoutes } from "./routes/reservation.routes";
import mogran from "morgan";

dotenv.config();

const app: Application = express();
const PORT = process.env.BACKEND_PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(mogran("dev"));

// Routes
app.use("/api/guests", guestRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/reservations", reservationRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
