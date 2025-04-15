import express from 'express';
import { BusController } from './bus.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../User/user.constant';

const router = express.Router();

// Route to add a new bus
router.post(
  '/add-bus',
  auth(USER_ROLES.superAdmin, USER_ROLES.admin),
  BusController.addBus
);

// Route to get all buses
router.get(
  '/all-bus',
  auth(USER_ROLES.superAdmin, USER_ROLES.admin),
  BusController.getAllBus
);

// Route to get a bus by its ID
router.get(
  '/:busId',
  auth(USER_ROLES.superAdmin, USER_ROLES.admin),
  BusController.getBusById
);

// Route to update a bus by its ID
router.put(
  '/update-bus/:busId',
  auth(USER_ROLES.superAdmin, USER_ROLES.admin),
  BusController.updateBus
);

// Route to delete a bus by its ID
router.delete(
  '/delete-bus/:busId',
  auth(USER_ROLES.superAdmin, USER_ROLES.admin),
  BusController.deleteBus
);

// Route to change the status of a bus
router.patch(
  '/change-bus-status/:busId',
  auth(USER_ROLES.superAdmin, USER_ROLES.admin),
  BusController.changeBusStatus
);

export const BusRoutes = router;
