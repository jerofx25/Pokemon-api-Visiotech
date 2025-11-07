import { envs } from "./config/envs";
import { AppRouter } from "./presentation/routes";
import { Server } from "./presentation/server";

(() => {

    main();

}) ();

function main(){

    const server = new Server({
        port: envs.PORT,
        routes: AppRouter.routes,
        public_path: envs.PUBLIC_PATH
    })
    
    server.start();
}