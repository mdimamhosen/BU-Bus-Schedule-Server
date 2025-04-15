"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bus = void 0;
const mongoose_1 = require("mongoose");
const BusSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    busNumber: {
        type: String,
        required: true,
        unique: true,
    },
    busName: {
        type: String,
        required: true,
    },
    busType: {
        type: String,
        enum: ['Mini Bus', 'Large Bus', 'Double Decker Bus'],
        required: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        default: true,
    },
    route: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Route',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});
BusSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
BusSchema.statics.isDeleted = function (id) {
    return this.findOne({ id, isDeleted: true }).exec();
};
BusSchema.pre('find', function (next) {
    this.where({ isDeleted: false });
    next();
});
BusSchema.pre('findOne', function (next) {
    this.where({ isDeleted: false });
    next();
});
BusSchema.pre('findOneAndUpdate', function (next) {
    this.where({ isDeleted: false });
    next();
});
BusSchema.pre('countDocuments', function (next) {
    this.where({ isDeleted: false });
    next();
});
exports.Bus = (0, mongoose_1.model)('Bus', BusSchema);
