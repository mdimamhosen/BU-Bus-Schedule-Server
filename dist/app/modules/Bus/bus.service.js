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
exports.BusService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bus_utilts_1 = require("./bus.utilts");
const AppError_1 = require("../../utils/AppError");
const bus_model_1 = require("./bus.model");
const addBus = (bus) => __awaiter(void 0, void 0, void 0, function* () {
    const busData = {};
    const id = yield (0, bus_utilts_1.generateBusId)();
    busData.id = id;
    busData.busNumber = bus.busNumber;
    busData.busName = bus.busName;
    busData.busType = bus.busType;
    busData.isAvailable = bus.isAvailable || true;
    busData.isDeleted = bus.isDeleted || false;
    busData.route = bus.route;
    busData.createdAt = new Date();
    busData.updatedAt = new Date();
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const bus = new bus_model_1.Bus(busData);
        yield bus.save({ session });
        yield session.commitTransaction();
        console.log('Bus created successfully:', bus);
        return bus;
    }
    catch (err) {
        yield session.abortTransaction();
        console.error('Error during transaction:', err);
        // Throwing a proper AppError
        throw new AppError_1.AppError('Faield to add bus', 500);
    }
    finally {
        // Ensure the session is always ended
        yield session.endSession();
    }
});
const getAllBus = () => __awaiter(void 0, void 0, void 0, function* () {
    const buses = yield bus_model_1.Bus.find({ isDeleted: false });
    console.log('Fetching all buses:', buses);
    return buses;
});
const getBusById = (busId) => __awaiter(void 0, void 0, void 0, function* () {
    const bus = yield bus_model_1.Bus.findOne({ id: busId, isDeleted: false });
    if (!bus) {
        throw new AppError_1.AppError('Bus not found', 404);
    }
    console.log('Fetching bus by ID:', busId, 'Result:', bus);
    return bus;
});
const updateBus = (busId, bus) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBus = yield bus_model_1.Bus.findOneAndUpdate({ id: busId, isDeleted: false }, Object.assign(Object.assign({}, bus), { updatedAt: new Date() }), { new: true });
    if (!updatedBus) {
        throw new AppError_1.AppError('Bus not found', 404);
    }
    console.log('Updating bus:', busId, 'Result:', updatedBus);
    return updatedBus;
});
const deleteBus = (busId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedBus = yield bus_model_1.Bus.findOneAndUpdate({ id: busId }, { isDeleted: true, updatedAt: new Date() }, { new: true });
    if (!deletedBus) {
        throw new AppError_1.AppError('Bus not found', 404);
    }
    console.log('Deleting bus:', busId, 'Result:', deletedBus);
    return deletedBus;
});
const changeBusStatus = (busId, isAvailable) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBus = yield bus_model_1.Bus.findOneAndUpdate({ id: busId, isDeleted: false }, { isAvailable, updatedAt: new Date() }, { new: true });
    if (!updatedBus) {
        throw new AppError_1.AppError('Bus not found', 404);
    }
    console.log('Changing bus status:', busId, 'Result:', updatedBus);
    return updatedBus;
});
exports.BusService = {
    addBus,
    getAllBus,
    getBusById,
    updateBus,
    deleteBus,
    changeBusStatus,
};
