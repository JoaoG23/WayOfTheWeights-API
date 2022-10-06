import { Router } from "express";
import StatisticsController from "../controllers/StatisticsController";
const routers = Router();

routers.get("/", StatisticsController.listAll);
routers.get("/lastexercice/:userId", StatisticsController.lastExerciceAndDatas);
routers.get("/lastthree/:userId", StatisticsController.last3ExercicesUpdated);

export default routers;
