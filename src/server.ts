import mongoose from 'mongoose';
import app from './app';
import { appLogger } from './app/logger';
import colors from 'colors';
import { env } from './app/config';
import { Server } from 'http';

let server: Server;

(async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${env.dbURL}/${env.dbName}`,
    );

    appLogger.info(
      colors.green.bold(
        `✅ Database Connected! Host: ${connectionInstance?.connection?.host}`,
      ),
    );

    server = app.listen(Number(env.port), () => {
      appLogger.info(
        colors.green.bold(`🚀 Server running on localhost :${env.port}`),
      );
    });
  } catch (error) {
    appLogger.error(colors.red.bold(`❌ MongoDB connection error: ${error}`));
    process.exit(1);
  }
})();

process.on('unhandledRejection', (error) => {
  appLogger.error(
    colors.red.bold(`⚠️ Unhandled rejection, shutting down... ${error}`),
  );

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  appLogger.error(
    colors.red.bold(`❌ Uncaught exception: ${error}, shutting down...`),
  );
  process.exit(1);
});
