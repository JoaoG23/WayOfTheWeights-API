import { Router } from "express";
const routers = Router();

import usersRouters from './userRouters';
import trainingRouters from './trainingRouters';
import loginRouters from './sessionRouters';
import exercicesRouters from './exercicesRouters';
import statisticsRouters from './statisticsRouters';

import auth from '../routers/Auth';

routers.use('/exercice',auth.comum,  exercicesRouters);
routers.use('/users' ,auth.comum, usersRouters);
routers.use('/statistics' ,auth.comum, statisticsRouters);
routers.use('/training', auth.comum , trainingRouters);
routers.use('/auth', loginRouters);

export default routers;