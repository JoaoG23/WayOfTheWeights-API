import { Router } from "express";
import UsersController from "../controllers/UsersController";
const routers = Router();

routers.post("/register", UsersController.create);
// routers.post("/login", UsersController.create);

export default routers;
