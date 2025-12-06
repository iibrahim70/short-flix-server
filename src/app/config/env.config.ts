import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export const env = {
  // Server
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  corsOrigin:
    process.env.CORS_ORIGIN?.split(',').map((origin) => origin.trim()) || [],

  // Database
  dbURL: process.env.DATABASE_URL,
  dbName: process.env.DB_NAME,
};
