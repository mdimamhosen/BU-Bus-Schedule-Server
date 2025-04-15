"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
            message: 'Name is required',
        }),
        email: zod_1.z.string({
            required_error: 'Email is required',
            message: 'Email is required',
        }),
        mobileNumber: zod_1.z.string({
            required_error: 'Mobile number is required',
            message: 'Mobile number is required',
        }),
    }),
});
exports.UserValidation = {
    createUserValidationSchema,
};
