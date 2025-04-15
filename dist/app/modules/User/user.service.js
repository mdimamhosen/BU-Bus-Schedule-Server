"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = require("../../utils/AppError");
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const user_constant_1 = require("./user.constant");
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const createAdminIntoDB = (
// eslint-disable-next-line @typescript-eslint/no-explicit-any
file, password, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = {
        name: payload.name,
        email: payload.email,
        password: password || config_1.default.default_password,
        role: payload.role || 'admin',
        needPasswordChange: true,
        mobileNumber: payload.mobileNumber,
        status: payload.status || 'active',
        isBlocked: payload.isBlocked || false,
        isDeleted: payload.isDeleted || false,
    };
    console.log('User data prepared for insertion:', userData);
    const id = yield (0, user_utils_1.genarateAdminId)();
    userData.id = id;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        if (file) {
            const imageName = `${userData.id}${payload === null || payload === void 0 ? void 0 : payload.name}`;
            const path = file === null || file === void 0 ? void 0 : file.path;
            //send image to cloudinary
            const { secure_url } = yield (0, sendImageToCloudinary_1.uploadImageToCloudinary)(imageName, path, 'user-bus-schedule');
            userData.profileImg = secure_url;
        }
        const user = new user_model_1.User(userData);
        yield user.save({ session });
        yield session.commitTransaction();
        console.log('User created successfully:', user);
        return user;
    }
    catch (err) {
        yield session.abortTransaction();
        console.error('Error during transaction:', err);
        // Throwing a proper AppError
        throw new AppError_1.AppError('Failed to create admin user', 500);
    }
    finally {
        // Ensure the session is always ended
        yield session.endSession();
    }
});
const getMe = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    let result = null;
    if (role === user_constant_1.USER_ROLES.superAdmin) {
        result = yield user_model_1.User.findOne({ id: userId }).populate('user');
    }
    if (role === user_constant_1.USER_ROLES.admin) {
        result = yield user_model_1.User.findOne({ id: userId }).populate('user');
    }
    return result;
});
const changeStatus = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
exports.UserServices = { createAdminIntoDB, getMe, changeStatus };
