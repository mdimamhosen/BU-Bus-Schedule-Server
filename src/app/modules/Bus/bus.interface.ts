import { Types } from 'mongoose';

export interface IBus {
  id: string;
  busNumber: string;
  busName: string;
  busType: BusTypes;
  isAvailable: boolean;
  isDeleted: boolean;
  route: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface BusTypes {
  miniBus: 'Mini Bus';
  largeBus: 'Large Bus';
  doubleDecker: 'Double Decker Bus';
}
