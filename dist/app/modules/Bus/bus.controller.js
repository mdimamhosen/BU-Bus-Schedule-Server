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
exports.BusController = void 0;
const catchAsyncResponse_1 = __importDefault(require("../../utils/catchAsyncResponse"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const bus_service_1 = require("./bus.service");
const addBus = (0, catchAsyncResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const busData = req.body;
    const bus = yield bus_service_1.BusService.addBus(busData);
    if (!bus) {
        (0, sendResponse_1.default)(res, {
            message: 'Bus not added',
            success: false,
            statusCode: 400,
        });
        return;
    }
    (0, sendResponse_1.default)(res, {
        message: 'Bus added successfully',
        success: true,
        data: bus,
        statusCode: 200,
    });
}));
const getAllBus = (0, catchAsyncResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const filters = req.query;
    // const paginationOptions = {
    //     page: Number(req.query.page) || 1,
    //     limit: Number(req.query.limit) || 10,
    // };
    const result = yield bus_service_1.BusService.getAllBus();
    (0, sendResponse_1.default)(res, {
        message: 'Buses fetched successfully',
        success: true,
        data: result,
        statusCode: 200,
    });
}));
const getBusById = (0, catchAsyncResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const busId = req.params.busId;
    const bus = yield bus_service_1.BusService.getBusById(busId);
    if (!bus) {
        (0, sendResponse_1.default)(res, {
            message: 'Bus not found',
            success: false,
            statusCode: 404,
        });
        return;
    }
    (0, sendResponse_1.default)(res, {
        message: 'Bus fetched successfully',
        success: true,
        data: bus,
        statusCode: 200,
    });
}));
const updateBus = (0, catchAsyncResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const busId = req.params.busId;
    const busData = req.body;
    const updatedBus = yield bus_service_1.BusService.updateBus(busId, busData);
    if (!updatedBus) {
        (0, sendResponse_1.default)(res, {
            message: 'Bus not found',
            success: false,
            statusCode: 404,
        });
        return;
    }
    (0, sendResponse_1.default)(res, {
        message: 'Bus updated successfully',
        success: true,
        data: updatedBus,
        statusCode: 200,
    });
}));
const deleteBus = (0, catchAsyncResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const busId = req.params.busId;
    const deletedBus = yield bus_service_1.BusService.deleteBus(busId);
    if (!deletedBus) {
        (0, sendResponse_1.default)(res, {
            message: 'Bus not found',
            success: false,
            statusCode: 404,
        });
        return;
    }
    (0, sendResponse_1.default)(res, {
        message: 'Bus deleted successfully',
        success: true,
        data: deletedBus,
        statusCode: 200,
    });
}));
const changeBusStatus = (0, catchAsyncResponse_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const busId = req.params.busId;
    const { isAvailable } = req.body;
    const updatedBus = yield bus_service_1.BusService.changeBusStatus(busId, isAvailable);
    if (!updatedBus) {
        (0, sendResponse_1.default)(res, {
            message: 'Bus not found',
            success: false,
            statusCode: 404,
        });
        return;
    }
    (0, sendResponse_1.default)(res, {
        message: 'Bus status changed successfully',
        success: true,
        data: updatedBus,
        statusCode: 200,
    });
}));
exports.BusController = {
    addBus,
    getAllBus,
    getBusById,
    updateBus,
    deleteBus,
    changeBusStatus,
};
