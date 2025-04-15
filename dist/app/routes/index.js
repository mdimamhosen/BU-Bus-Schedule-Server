"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/User/user.routes");
const auth_routes_1 = require("../modules/Auth/auth.routes");
const bus_route_1 = require("../modules/Bus/bus.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        module: user_routes_1.UserRoutes,
    },
    {
        path: '/auth',
        module: auth_routes_1.AuthRoutes,
    },
    {
        path: '/bus',
        module: bus_route_1.BusRoutes,
    },
];
moduleRoutes.forEach(route => {
    router.use(route.path, route.module);
});
exports.routes = router;
