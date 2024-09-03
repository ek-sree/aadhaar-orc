import dotenv from 'dotenv';

dotenv.config();

export const config = {
    PORT : process.env.PORT,
    CORS_URL: process.env.CORS_URL
}