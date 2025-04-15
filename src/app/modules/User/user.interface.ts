import { Model } from 'mongoose';
import { USER_ROLES_LIST, USER_STATUS_LIST } from './user.constant';

export interface IUser extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  role: USER_ROLES_LIST;
  needPasswordChange?: boolean;
  mobileNumber?: string;
  status?: USER_STATUS_LIST;
  isBlocked?: boolean;
  isDeleted?: boolean;
  refreshToken?: string;
  profileImg?: string;
  accessToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUser> {
  isUserExist(email: string): Promise<IUser | null>;
  isUserBlocked(email: string): Promise<boolean>;
  isUserDeleted(email: string): Promise<boolean>;
  isPasswordMatched(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
  isJwtIssuedBeforePasswordChange(
    passwordChangeTime: Date,
    jwtIssuedTime: number
  ): boolean;
}
