import dotenv from 'dotenv';
import { Server } from 'node:http';
import { createApp } from './app';

dotenv.config();

const app = createApp();

const parsePort = (value: string | undefined): number => {
  const port = Number(value ?? 3000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535');
  }
  return port;
};

export const start = (port = parsePort(process.env.PORT)): Server => {
  const server = app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });

  server.on('error', (error) => {
    console.error(error);
    process.exit(1);
  });

  const shutdown = (signal: string) => {
    console.log(`${signal} received, shutting down`);
    server.close((error) => {
      if (error) {
        console.error(error);
        process.exitCode = 1;
      }
    });
  };

  process.once('SIGINT', () => shutdown('SIGINT'));
  process.once('SIGTERM', () => shutdown('SIGTERM'));

  return server;
};

if (require.main === module) {
  start();
}
