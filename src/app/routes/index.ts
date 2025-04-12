import express from 'express';
import { UserRoutes } from '../modules/User/user.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/',
    module: UserRoutes,
  },
];
moduleRoutes.forEach(route => {
  router.use(route.path, route.module);
});

export const routes = router;
