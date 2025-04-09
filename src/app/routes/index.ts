import express from 'express';

const router = express.Router();

// const moduleRoutes = [
//   {
//     path: '/',
//     module:  import('/').then(module => module.routes),
//   },
// ];
// moduleRoutes.forEach(route => {
//   router.use(route.path, route.module);
// });

export const routes = router;
