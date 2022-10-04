import { Router } from "express";
import TrainingController from "../controllers/TrainingController";
const routers = Router();

routers.get("/", TrainingController.listAll);
routers.get("/:id", TrainingController.listOneForId);

routers.delete("/:id", TrainingController.deleteForId);
routers.delete("/", TrainingController.deleteForId);

routers.put("/:id", TrainingController.updateForId);
routers.put("/", TrainingController.updateForId);
routers.get("/user/:idUser", TrainingController.listAllForIdUser);

routers.post("/", TrainingController.create);

export default routers;
