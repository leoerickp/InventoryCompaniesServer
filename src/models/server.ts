import express, { Application } from 'express';
import cors from 'cors';
import { join } from 'path';
import { corsOptions } from '../config/cors-options';
import { authRoutes, publicRoutes, seedRoutes, swaggerDocs, usersRoutes } from '../routes';
import { db } from '../database/connectiondb';
import { companiesRoutes } from '../routes/companies.routes';
import { itemsRoutes } from '../routes/items.routes';

export class Server {
    public app: Application;
    private port: number | string;
    private path = {
        public: '/',
        auth: '/api/auth',
        companies: '/api/companies',
        items: '/api/items',
        seed: '/api/seed',
        users: '/api/users',
        swagger: '/api/docs'
    }
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.connectToDB();

        this.setMiddlewares();

        this.setRoutes();

    }
    private async connectToDB() {
        try {
            await db.authenticate();
            console.log('Database connected');
        } catch (error) {
            throw new Error(error as any);

        }
    }

    private setMiddlewares() {
        this.app.use(cors(corsOptions));
        this.app.use(express.static(join(__dirname, '../../public/')));
        this.app.use(express.json());
    }

    private setRoutes() {
        if (process.env.STATE === 'dev') {
            this.app.use(this.path.seed, seedRoutes);
        }
        this.app.use(this.path.auth, authRoutes);
        this.app.use(this.path.companies, companiesRoutes);
        this.app.use(this.path.items, itemsRoutes);
        this.app.use(this.path.users, usersRoutes);
        swaggerDocs(this.app, this.path.swagger, this.port);
        this.app.use(this.path.public, publicRoutes);
    }

    public bootstrap() {
        this.app.listen(this.port, () => {
            console.log('Server is running on port:', this.port);
        });
    }
}