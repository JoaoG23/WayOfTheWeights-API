import { Router } from "express";
import StatisticsController from "../controllers/StatisticsController";
const routers = Router();

routers.get("/", StatisticsController.listAll);

export default routers;
