export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
} as const;

export const USER_ROLES = {
  superAdmin: 'superAdmin',
  admin: 'admin',
} as const;

export type USER_ROLES_LIST = (typeof USER_ROLES)[keyof typeof USER_ROLES];
export type USER_STATUS_LIST = (typeof USER_STATUS)[keyof typeof USER_STATUS];
