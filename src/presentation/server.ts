import express, { Router } from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';

interface Options {
    port: number;
    routes: Router;
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly routes: Router;

    constructor(options: Options) {
        const { port, routes } = options;

        this.port = port;
        this.routes = routes;
    }

    async start() {

        //* Middlewares

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(fileUpload({
            limits: {
                fileSize: 5 * 1024 * 1024
            },
        }));

        //* Routes

        this.app.use(this.routes);

        //* Spa

        //* SPA /^\/(?!api).*/  <== Únicamente si no empieza con la palabra api
        this.app.get('*', (req, res) => {
            res.json({
                message: 'Hello World'
            });
        });

        //* Start server

        this.app.listen(this.port, () => {
            console.log(`Server running in port ${this.port}`);
        });

    }

}

