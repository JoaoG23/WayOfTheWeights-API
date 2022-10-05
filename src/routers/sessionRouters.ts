import { Router } from "express";
import UsersController from "../controllers/UsersController";
const routers = Router();

routers.post("/register", UsersController.create);
routers.post("/login", UsersController.logar);
routers.put("/forgetpassword", UsersController.forgetPassword);

export default routers;
