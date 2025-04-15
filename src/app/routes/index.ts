import express from 'express';
import { UserRoutes } from '../modules/User/user.routes';
import { AuthRoutes } from '../modules/Auth/auth.routes';
import { BusRoutes } from '../modules/Bus/bus.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    module: UserRoutes,
  },
  {
    path: '/auth',
    module: AuthRoutes,
  },
  {
    path: '/bus',
    module: BusRoutes,
  },
];
moduleRoutes.forEach(route => {
  router.use(route.path, route.module);
});

export const routes = router;
