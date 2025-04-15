import { Schema, model } from 'mongoose';
import { IBus } from './bus.interface';

const BusSchema = new Schema<IBus>(
  {
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
      type: Schema.Types.ObjectId,
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
  },
  {
    timestamps: true,
  }
);

BusSchema.pre<IBus>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

BusSchema.statics.isDeleted = function (this: typeof Bus, id: string) {
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

export const Bus = model<IBus>('Bus', BusSchema);
