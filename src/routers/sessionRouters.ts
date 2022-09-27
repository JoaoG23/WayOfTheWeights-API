import { Router } from "express";
import UsersController from "../controllers/UsersController/UsersController";
const routers = Router();

routers.post("/register", UsersController.create);
routers.post("/login", UsersController.logar);

export default routers;
