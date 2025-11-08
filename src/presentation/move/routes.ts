import { Router } from "express";
import { PostgresMoveDatasource } from "../../infrastructure/datasources/move/postgres-move.datasource";
import { MoveRepositoryImpl } from "../../infrastructure/repositories/move/move.repository.impl";
import { MoveController } from "./controller";



export class MoveRoutes {

    static get routes(): Router {

        const router = Router();

        const datasource = new PostgresMoveDatasource();
        const moveRepository = new MoveRepositoryImpl(datasource);
        const moveController = new MoveController(moveRepository);

        router.get("/", moveController.getMoves);
        router.get("/:id", moveController.getMoveById);
        router.post("/", moveController.createMove);
        router.put("/:id", moveController.updateMove);
        router.delete("/:id", moveController.deleteMove);

        return router;
    }
}