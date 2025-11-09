import { Router } from "express";
import { PostgresMoveDatasource } from "../../infrastructure/datasources/move/postgres-move.datasource";
import { MoveRepositoryImpl } from "../../infrastructure/repositories/move/move.repository.impl";
import { MoveController } from "./controller";
import { asyncHandler } from "../middlewares/async-handler";



export class MoveRoutes {

    static get routes(): Router {

        const router = Router();

        const datasource = new PostgresMoveDatasource();
        const moveRepository = new MoveRepositoryImpl(datasource);
        const moveController = new MoveController(moveRepository);

        router.get("/", asyncHandler(moveController.getMoves));
        router.get("/:id", asyncHandler(moveController.getMoveById));
        router.post("/", asyncHandler(moveController.createMove));
        router.put("/:id", asyncHandler(moveController.updateMove));
        router.delete("/:id", asyncHandler(moveController.deleteMove));

        return router;
    }
}