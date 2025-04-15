"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusRoutes = void 0;
const express_1 = __importDefault(require("express"));
const bus_controller_1 = require("./bus.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../User/user.constant");
const router = express_1.default.Router();
// Route to add a new bus
router.post('/add-bus', (0, auth_1.default)(user_constant_1.USER_ROLES.superAdmin, user_constant_1.USER_ROLES.admin), bus_controller_1.BusController.addBus);
// Route to get all buses
router.get('/all-bus', (0, auth_1.default)(user_constant_1.USER_ROLES.superAdmin, user_constant_1.USER_ROLES.admin), bus_controller_1.BusController.getAllBus);
// Route to get a bus by its ID
router.get('/:busId', (0, auth_1.default)(user_constant_1.USER_ROLES.superAdmin, user_constant_1.USER_ROLES.admin), bus_controller_1.BusController.getBusById);
// Route to update a bus by its ID
router.put('/update-bus/:busId', (0, auth_1.default)(user_constant_1.USER_ROLES.superAdmin, user_constant_1.USER_ROLES.admin), bus_controller_1.BusController.updateBus);
// Route to delete a bus by its ID
router.delete('/delete-bus/:busId', (0, auth_1.default)(user_constant_1.USER_ROLES.superAdmin, user_constant_1.USER_ROLES.admin), bus_controller_1.BusController.deleteBus);
// Route to change the status of a bus
router.patch('/change-bus-status/:busId', (0, auth_1.default)(user_constant_1.USER_ROLES.superAdmin, user_constant_1.USER_ROLES.admin), bus_controller_1.BusController.changeBusStatus);
exports.BusRoutes = router;
