import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
      message: 'Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
      message: 'Email is required',
    }),
    mobileNumber: z.string({
      required_error: 'Mobile number is required',
      message: 'Mobile number is required',
    }),
  }),
});
export const UserValidation = {
  createUserValidationSchema,
};
