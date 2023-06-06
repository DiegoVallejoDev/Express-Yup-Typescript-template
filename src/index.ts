import express, { Express } from 'express';
import dotenv from 'dotenv';
import { injectRoutes } from './routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || '3000';


injectRoutes(app);


const start = (port: string) => {
    try {
        app.listen(port, () => {
            console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error(err);
        process.exit();
    }
};

start(port);