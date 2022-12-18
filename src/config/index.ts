import { config } from 'dotenv';
config();

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { API_URL, SECRET_KEY, APP_PORT } = process.env;
