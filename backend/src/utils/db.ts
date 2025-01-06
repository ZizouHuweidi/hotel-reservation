import Knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

export const knex = Knex({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'admin',
        password: process.env.DB_PASSWORD || 'admin',
        database: process.env.DB_NAME || 'hotel_reservation',
    },
});



