import catchAsyncResponse from '../../utils/catchAsyncResponse';
import sendResponse from '../../utils/sendResponse';
import { BusService } from './bus.service';

const addBus = catchAsyncResponse(async (req, res) => {
  const busData = req.body;

  const bus = await BusService.addBus(busData);
  if (!bus) {
    sendResponse(res, {
      message: 'Bus not added',
      success: false,
      statusCode: 400,
    });
    return;
  }
  sendResponse(res, {
    message: 'Bus added successfully',
    success: true,
    data: bus,
    statusCode: 200,
  });
});
const getAllBus = catchAsyncResponse(async (req, res) => {
  // const filters = req.query;
  // const paginationOptions = {
  //     page: Number(req.query.page) || 1,
  //     limit: Number(req.query.limit) || 10,
  // };

  const result = await BusService.getAllBus();
  sendResponse(res, {
    message: 'Buses fetched successfully',
    success: true,
    data: result,
    statusCode: 200,
  });
});
const getBusById = catchAsyncResponse(async (req, res) => {
  const busId = req.params.busId;

  const bus = await BusService.getBusById(busId);
  if (!bus) {
    sendResponse(res, {
      message: 'Bus not found',
      success: false,
      statusCode: 404,
    });
    return;
  }

  sendResponse(res, {
    message: 'Bus fetched successfully',
    success: true,
    data: bus,
    statusCode: 200,
  });
});
const updateBus = catchAsyncResponse(async (req, res) => {
  const busId = req.params.busId;
  const busData = req.body;

  const updatedBus = await BusService.updateBus(busId, busData);
  if (!updatedBus) {
    sendResponse(res, {
      message: 'Bus not found',
      success: false,
      statusCode: 404,
    });
    return;
  }

  sendResponse(res, {
    message: 'Bus updated successfully',
    success: true,
    data: updatedBus,
    statusCode: 200,
  });
});
const deleteBus = catchAsyncResponse(async (req, res) => {
  const busId = req.params.busId;

  const deletedBus = await BusService.deleteBus(busId);
  if (!deletedBus) {
    sendResponse(res, {
      message: 'Bus not found',
      success: false,
      statusCode: 404,
    });
    return;
  }

  sendResponse(res, {
    message: 'Bus deleted successfully',
    success: true,
    data: deletedBus,
    statusCode: 200,
  });
});

const changeBusStatus = catchAsyncResponse(async (req, res) => {
  const busId = req.params.busId;
  const { isAvailable } = req.body;

  const updatedBus = await BusService.changeBusStatus(busId, isAvailable);
  if (!updatedBus) {
    sendResponse(res, {
      message: 'Bus not found',
      success: false,
      statusCode: 404,
    });
    return;
  }

  sendResponse(res, {
    message: 'Bus status changed successfully',
    success: true,
    data: updatedBus,
    statusCode: 200,
  });
});

export const BusController = {
  addBus,
  getAllBus,
  getBusById,
  updateBus,
  deleteBus,
  changeBusStatus,
};
