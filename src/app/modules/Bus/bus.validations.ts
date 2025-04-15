import { z } from 'zod';

export const BusTypesEnum = z.enum([
  'Mini Bus',
  'Large Bus',
  'Double Decker Bus',
]);

export const createBusSchema = z.object({
  body: z.object({
    id: z.string().nonempty('Bus ID is required'),
    busNumber: z.string().nonempty('Bus number is required'),
    busName: z.string().nonempty('Bus name is required'),
    busType: BusTypesEnum,
    isAvailable: z.boolean().optional().default(true),
    isDeleted: z.boolean().optional().default(false),
    route: z.string().nonempty('Route ID is required'),
  }),
});

export const updateBusSchema = z.object({
  body: z.object({
    busNumber: z.string().optional(),
    busName: z.string().optional(),
    busType: BusTypesEnum.optional(),
    isAvailable: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
    route: z.string().optional(),
  }),
});

export const changeBusStatusSchema = z.object({
  body: z.object({
    isAvailable: z.boolean().refine(value => value !== undefined, {
      message: 'Availability status is required',
    }),
  }),
});
