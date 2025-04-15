"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_constant_1 = require("./user.constant");
const auth_1 = __importDefault(require("./../../middlewares/auth"));
const user_controller_1 = require("./user.controller");
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post('/create-admin', (0, auth_1.default)(user_constant_1.USER_ROLES.superAdmin), sendImageToCloudinary_1.upload.single('file'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(user_validation_1.UserValidation.createUserValidationSchema), user_controller_1.UserController.createAdmin);
router.get('/me', (0, auth_1.default)(user_constant_1.USER_ROLES.superAdmin, user_constant_1.USER_ROLES.admin), user_controller_1.UserController.getMe);
router.patch('/change-status/:id', (0, auth_1.default)(user_constant_1.USER_ROLES.superAdmin), user_controller_1.UserController.changeStatus);
exports.UserRoutes = router;
