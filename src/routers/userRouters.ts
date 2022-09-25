import { Router } from "express";
import UsersController from "../controllers/UsersController/UsersController";
const routers = Router();

routers.get("/", UsersController.listAll);
routers.get("/:id", UsersController.listOneForId);
routers.get("/username/:userName", UsersController.listOneForUserUsername);

routers.delete("/:id", UsersController.deleteUserForId);

routers.put("/", UsersController.updateUserForUserName);

routers.post("/", UsersController.create);

export default routers;
