import express from 'express';
import ValidateUserRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../User/user.constant';

const router = express.Router();

router.post(
  '/login',
  ValidateUserRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser
);

router.post(
  '/change-password',
  auth(USER_ROLES.admin, USER_ROLES.superAdmin),
  ValidateUserRequest(AuthValidation.changePasswordValidationSchema),
  AuthController.changePassword
);

router.post(
  '/refresh-token',
  ValidateUserRequest(AuthValidation.refreshTokenValidationSchema),
  AuthController.refreshToken
);

export const AuthRoutes = router;
