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
exports.generateBusId = void 0;
const bus_model_1 = require("./bus.model");
const findLastBusFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findLastBus = yield bus_model_1.Bus.findOne({}, { id: 1 }).sort({
            createdAt: -1,
        });
        return findLastBus;
    }
    catch (error) {
        console.error('Error finding the last bus from DB:', error);
        throw new Error('Failed to retrieve the last bus from the database');
    }
});
const generateBusId = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lastBus = yield findLastBusFromDB();
        let newId = 0;
        if (lastBus && lastBus.id) {
            const lastId = parseInt(lastBus.id.split('-')[1], 10);
            if (!isNaN(lastId)) {
                newId = lastId + 1;
            }
            else {
                throw new Error('Invalid bus ID format in the database');
            }
        }
        else {
            newId = 1;
        }
        // Pad the new ID with leading zeros (e.g., BUS-001, BUS-002)
        const paddedId = newId.toString().padStart(4, '0');
        return `BUS-${paddedId}`;
    }
    catch (error) {
        console.error('Error generating bus ID:', error);
        throw new Error('Failed to generate a new bus ID');
    }
});
exports.generateBusId = generateBusId;
