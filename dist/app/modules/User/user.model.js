"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_constant_1 = require("./user.constant");
const userSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: user_constant_1.USER_ROLES,
        required: true,
        default: user_constant_1.USER_ROLES.admin,
    },
    profileImg: { type: String },
    needPasswordChange: { type: Boolean, default: true },
    mobileNumber: { type: String },
    status: {
        type: String,
        enum: user_constant_1.USER_STATUS,
        default: user_constant_1.USER_STATUS.ACTIVE,
    },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    refreshToken: { type: String },
    accessToken: { type: String },
}, { timestamps: true });
// 🔒 Password Hashing
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (!user.isModified('password'))
            return next();
        const salt = yield bcrypt_1.default.genSalt(10);
        user.password = yield bcrypt_1.default.hash(user.password, salt);
        next();
    });
});
// 🔐 Compare Password (Instance Method)
userSchema.methods.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcrypt_1.default.compare(candidatePassword, this.password);
    });
};
//   Static Methods
userSchema.statics.isUserExist = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        return this.findOne({ email });
    });
};
userSchema.statics.isUserBlocked = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const user = yield this.findOne({ email });
        return (_a = user === null || user === void 0 ? void 0 : user.isBlocked) !== null && _a !== void 0 ? _a : true;
    });
};
userSchema.statics.isUserDeleted = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const user = yield this.findOne({ email });
        return (_a = user === null || user === void 0 ? void 0 : user.isDeleted) !== null && _a !== void 0 ? _a : true;
    });
};
userSchema.statics.isPasswordMatched = function (candidatePassword, userPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcrypt_1.default.compare(candidatePassword, userPassword);
    });
};
userSchema.statics.isJwtIssuedBeforePasswordChange = function (passwordChangeTime, jwtIssuedTime) {
    return passwordChangeTime.getTime() > jwtIssuedTime * 1000;
};
exports.User = mongoose_1.default.model('User', userSchema);
