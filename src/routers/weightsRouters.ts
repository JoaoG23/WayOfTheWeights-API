import { Router } from "express";
import WeightsRouters from "../controllers/WeightsController";
const routers = Router();

routers.get("/", WeightsRouters.listAll);

export default routers;