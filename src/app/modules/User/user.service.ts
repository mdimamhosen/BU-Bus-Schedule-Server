import mongoose from 'mongoose';
import config from '../../config';
import { IUser } from './user.interface';
import { AppError } from '../../utils/AppError';
import { User } from './user.model';
import { genarateAdminId } from './user.utils';
import { USER_ROLES } from './user.constant';
import { uploadImageToCloudinary } from '../../utils/sendImageToCloudinary';

const createAdminIntoDB = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  file: any,
  password: string,
  payload: IUser
) => {
  const userData: Partial<IUser> = {
    name: payload.name,
    email: payload.email,
    password: password || (config.default_password as string),
    role: payload.role || 'admin',
    needPasswordChange: true,
    mobileNumber: payload.mobileNumber,
    status: payload.status || 'active',
    isBlocked: payload.isBlocked || false,
    isDeleted: payload.isDeleted || false,
  };

  console.log('User data prepared for insertion:', userData);

  const id = await genarateAdminId();

  userData.id = id;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    if (file) {
      const imageName = `${userData.id}${payload?.name}`;
      const path = file?.path;
      //send image to cloudinary
      const { secure_url } = await uploadImageToCloudinary(
        imageName,
        path,
        'user-bus-schedule'
      );
      userData.profileImg = secure_url as string;
    }

    const user = new User(userData);
    await user.save({ session });

    await session.commitTransaction();
    console.log('User created successfully:', user);
    return user;
  } catch (err: unknown) {
    await session.abortTransaction();
    console.error('Error during transaction:', err);

    // Throwing a proper AppError
    throw new AppError('Failed to create admin user', 500);
  } finally {
    // Ensure the session is always ended
    await session.endSession();
  }
};

const getMe = async (userId: string, role: string) => {
  let result = null;

  if (role === USER_ROLES.superAdmin) {
    result = await User.findOne({ id: userId }).populate('user');
  }

  if (role === USER_ROLES.admin) {
    result = await User.findOne({ id: userId }).populate('user');
  }

  return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const UserServices = { createAdminIntoDB, getMe, changeStatus };
