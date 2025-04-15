import mongoose from 'mongoose';
import { IBus } from './bus.interface';
import { generateBusId } from './bus.utilts';
import { AppError } from '../../utils/AppError';
import { Bus } from './bus.model';

const addBus = async (bus: IBus) => {
  const busData: Partial<IBus> = {};
  const id = await generateBusId();
  busData.id = id;
  busData.busNumber = bus.busNumber;
  busData.busName = bus.busName;
  busData.busType = bus.busType;
  busData.isAvailable = bus.isAvailable || true;
  busData.isDeleted = bus.isDeleted || false;
  busData.route = bus.route;
  busData.createdAt = new Date();
  busData.updatedAt = new Date();

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const bus = new Bus(busData);
    await bus.save({ session });
    await session.commitTransaction();
    console.log('Bus created successfully:', bus);
    return bus;
  } catch (err: unknown) {
    await session.abortTransaction();
    console.error('Error during transaction:', err);

    // Throwing a proper AppError
    throw new AppError('Faield to add bus', 500);
  } finally {
    // Ensure the session is always ended
    await session.endSession();
  }
};

const getAllBus = async () => {
  const buses = await Bus.find({ isDeleted: false });
  console.log('Fetching all buses:', buses);
  return buses;
};

const getBusById = async (busId: string) => {
  const bus = await Bus.findOne({ id: busId, isDeleted: false });
  if (!bus) {
    throw new AppError('Bus not found', 404);
  }
  console.log('Fetching bus by ID:', busId, 'Result:', bus);
  return bus;
};

const updateBus = async (busId: string, bus: Partial<IBus>) => {
  const updatedBus = await Bus.findOneAndUpdate(
    { id: busId, isDeleted: false },
    { ...bus, updatedAt: new Date() },
    { new: true }
  );
  if (!updatedBus) {
    throw new AppError('Bus not found', 404);
  }
  console.log('Updating bus:', busId, 'Result:', updatedBus);
  return updatedBus;
};

const deleteBus = async (busId: string) => {
  const deletedBus = await Bus.findOneAndUpdate(
    { id: busId },
    { isDeleted: true, updatedAt: new Date() },
    { new: true }
  );
  if (!deletedBus) {
    throw new AppError('Bus not found', 404);
  }
  console.log('Deleting bus:', busId, 'Result:', deletedBus);
  return deletedBus;
};

const changeBusStatus = async (busId: string, isAvailable: boolean) => {
  const updatedBus = await Bus.findOneAndUpdate(
    { id: busId, isDeleted: false },
    { isAvailable, updatedAt: new Date() },
    { new: true }
  );
  if (!updatedBus) {
    throw new AppError('Bus not found', 404);
  }
  console.log('Changing bus status:', busId, 'Result:', updatedBus);
  return updatedBus;
};

export const BusService = {
  addBus,
  getAllBus,
  getBusById,
  updateBus,
  deleteBus,
  changeBusStatus,
};
