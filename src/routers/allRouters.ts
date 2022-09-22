import { Router } from "express";

import usersRouters from './userRouters';
const routers = Router();

routers.use('/users', usersRouters);

export default routers;