import { Router } from "express";

import usersRouters from './userRouters';
import loginRouters from './sessionRouters';
const routers = Router();
import auth from '../routers/Auth';


routers.use('/users' ,usersRouters);
routers.use('/auth' ,loginRouters);

export default routers;