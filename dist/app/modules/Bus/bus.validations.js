"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeBusStatusSchema = exports.updateBusSchema = exports.createBusSchema = exports.BusTypesEnum = void 0;
const zod_1 = require("zod");
exports.BusTypesEnum = zod_1.z.enum([
    'Mini Bus',
    'Large Bus',
    'Double Decker Bus',
]);
exports.createBusSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string().nonempty('Bus ID is required'),
        busNumber: zod_1.z.string().nonempty('Bus number is required'),
        busName: zod_1.z.string().nonempty('Bus name is required'),
        busType: exports.BusTypesEnum,
        isAvailable: zod_1.z.boolean().optional().default(true),
        isDeleted: zod_1.z.boolean().optional().default(false),
        route: zod_1.z.string().nonempty('Route ID is required'),
    }),
});
exports.updateBusSchema = zod_1.z.object({
    body: zod_1.z.object({
        busNumber: zod_1.z.string().optional(),
        busName: zod_1.z.string().optional(),
        busType: exports.BusTypesEnum.optional(),
        isAvailable: zod_1.z.boolean().optional(),
        isDeleted: zod_1.z.boolean().optional(),
        route: zod_1.z.string().optional(),
    }),
});
exports.changeBusStatusSchema = zod_1.z.object({
    body: zod_1.z.object({
        isAvailable: zod_1.z.boolean().refine(value => value !== undefined, {
            message: 'Availability status is required',
        }),
    }),
});
