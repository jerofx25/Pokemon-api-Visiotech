
import express, { Router } from "express";
import { errorHandler } from "./middlewares/error-handler";

interface Options {
    port: number;
    routes: Router;
    public_path?: string;
}

export class Server {

    private app = express();
    private readonly routes: Router;
    private readonly port: number;
    private readonly public_path: string;

    constructor(option: Options){
        const {routes, port, public_path = "public"} = option;
        this.port = port;
        this.routes = routes;
        this.public_path = public_path;
    }

    async start() {

        // Middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        // Public Folder
        this.app.use(express.static(this.public_path));

        //Routes
        this.app.use(this.routes);

        this.app.use(errorHandler);

        this.app.listen(this.port, () => {

            console.log(`Server running on port ${this.port}`);
            
        });
    }

}