import config from '../config';
import { USER_ROLES, USER_STATUS } from '../modules/User/user.constant';
import { User } from '../modules/User/user.model';

const superUser = {
  id: '0001',
  name: 'Super Admin',
  mobileNumber: '01700000000',
  email: 'abedinforhan@gmail.com',
  password: config.super_admin_password,
  needsPasswordChange: false,
  role: USER_ROLES.superAdmin,
  status: USER_STATUS.ACTIVE,
  isDeleted: false,
  isBlocked: false,
};

const seedSuperAdmin = async () => {
  //when database is connected, we will check is there any user who is super admin
  const isSuperAdminExits = await User.findOne({ role: USER_ROLES.superAdmin });

  if (!isSuperAdminExits) {
    await User.create(superUser);
  }
};

export default seedSuperAdmin;
