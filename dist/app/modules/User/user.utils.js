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
Object.defineProperty(exports, "__esModule", { value: true });
exports.genarateAdminId = void 0;
const user_constant_1 = require("./user.constant");
const user_model_1 = require("./user.model");
const findLastUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastStudent = yield user_model_1.User.findOne({
        role: user_constant_1.USER_ROLES.admin,
    }, {
        id: 1,
        _id: 0,
    })
        .sort({
        createdAt: -1,
    })
        .lean();
    return (lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id) ? lastStudent.id : undefined;
});
const genarateAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    let currentId = (0).toString();
    const lastAdmin = yield findLastUser();
    if (lastAdmin) {
        currentId = lastAdmin.split('-')[1];
        let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
        incrementId = `A-${incrementId}`;
        return incrementId;
    }
    else {
        const newId = (Number(currentId) + 1).toString().padStart(4, '0');
        currentId = `A-${newId}`;
        return currentId;
    }
});
exports.genarateAdminId = genarateAdminId;
