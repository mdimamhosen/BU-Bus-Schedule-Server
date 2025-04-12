import { USER_ROLES } from './user.constant';
import { User } from './user.model';

const findLastUser = async () => {
  const lastStudent = await User.findOne(
    {
      role: USER_ROLES.admin,
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};

export const genarateAdminId = async () => {
  let currentId = (0).toString();
  const lastAdmin = await findLastUser();

  if (lastAdmin) {
    currentId = lastAdmin.split('-')[1];
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

    incrementId = `A-${incrementId}`;

    return incrementId;
  } else {
    const newId = (Number(currentId) + 1).toString().padStart(4, '0');
    currentId = `A-${newId}`;
    return currentId;
  }
};
