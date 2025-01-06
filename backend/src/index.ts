import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { guestRoutes } from './routes/guest.routes';
import mogran from 'morgan';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(mogran('dev'));

// Routes
app.use('/api/guests', guestRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
