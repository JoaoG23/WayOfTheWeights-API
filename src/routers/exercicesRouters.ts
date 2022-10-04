import { Router } from "express";
import ExercicesController from "../controllers/ExercicesController";

const routers = Router();

routers.get("/", ExercicesController.listAll);
routers.get("/:id", ExercicesController.listOneForId);

routers.delete("/:id", ExercicesController.deleteForId);
routers.delete("/", ExercicesController.deleteForId);

routers.put("/:id", ExercicesController.updateForId);
routers.put("/", ExercicesController.updateForId);
routers.get("/training/:idTrainings", ExercicesController.listAllForIdTraining);

routers.post("/", ExercicesController.create);

export default routers;
