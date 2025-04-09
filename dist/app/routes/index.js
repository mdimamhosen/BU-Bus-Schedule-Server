"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// const moduleRoutes = [
//   {
//     path: '/',
//     module:  import('/').then(module => module.routes),
//   },
// ];
// moduleRoutes.forEach(route => {
//   router.use(route.path, route.module);
// });
exports.routes = router;
