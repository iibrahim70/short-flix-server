import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export const config = {
  server: {
    port: process.env.PORT,
    nodeEnv: process.env.NODE_ENV,
    corsOrigin: process.env.CORS_ORIGIN,
  },

  database: {
    dbURL: process.env.DATABASE_URL,
    dbName: process.env.DB_NAME,
  },
};
