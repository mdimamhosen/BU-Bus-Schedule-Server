import express, { NextFunction, Request, Response } from 'express';
import { USER_ROLES } from './user.constant';
import auth from './../../middlewares/auth';
import { UserController } from './user.controller';
import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();

router.post(
  '/create-admin',
  auth(USER_ROLES.superAdmin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  // validateRequest(createAdminValidationSchema),
  UserController.createAdmin
);

router.get(
  '/me',
  auth(USER_ROLES.superAdmin, USER_ROLES.admin),
  UserController.getMe
);

router.patch(
  '/change-status/:id',
  auth(USER_ROLES.superAdmin),
  UserController.changeStatus
);

export const UserRoutes = router;
