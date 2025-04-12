import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser, IUserModel } from './user.interface';
import { USER_ROLES, USER_STATUS } from './user.constant';

const userSchema = new Schema<IUser, IUserModel>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: USER_ROLES,
      required: true,
      default: USER_ROLES.admin,
    },
    profileImg: { type: String },
    needPasswordChange: { type: Boolean, default: true },
    mobileNumber: { type: String },
    status: {
      type: String,
      enum: USER_STATUS,
      default: USER_STATUS.ACTIVE,
    },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    refreshToken: { type: String },
    accessToken: { type: String },
  },
  { timestamps: true }
);

// 🔒 Password Hashing
userSchema.pre('save', async function (next) {
  const user = this as unknown as mongoose.Document & IUser;
  if (!user.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

// 🔐 Compare Password (Instance Method)
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

//   Static Methods
userSchema.statics.isUserExist = async function (
  email: string
): Promise<IUser | null> {
  return this.findOne({ email });
};

userSchema.statics.isUserBlocked = async function (
  email: string
): Promise<boolean> {
  const user = await this.findOne({ email });
  return user?.isBlocked ?? true;
};

userSchema.statics.isUserDeleted = async function (
  email: string
): Promise<boolean> {
  const user = await this.findOne({ email });
  return user?.isDeleted ?? true;
};

userSchema.statics.isPasswordMatched = async function (
  candidatePassword: string,
  userPassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, userPassword);
};

userSchema.statics.isJwtIssuedBeforePasswordChange = function (
  passwordChangeTime: Date,
  jwtIssuedTime: number
): boolean {
  return passwordChangeTime.getTime() > jwtIssuedTime * 1000;
};

export const User = mongoose.model<IUser, IUserModel>('User', userSchema);
