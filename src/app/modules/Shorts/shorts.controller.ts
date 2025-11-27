import { catchAsync, sendResponse } from '@/utils';
import httpStatus from 'http-status';
import { ShortServices } from './shorts.service';

const createShort = catchAsync(async (req, res) => {
  const result = await ShortServices.createShortToDB(req?.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Short created successfully!',
    data: result,
  });
});

const getShorts = catchAsync(async (req, res) => {
  const result = await ShortServices.getShortsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Shorts retrieved successfully!',
    data: result,
  });
});

const updateShortById = catchAsync(async (req, res) => {
  const result = await ShortServices.updateShortByIdFromDB(
    req?.params?.slug,
    req?.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Short with ID ${result?._id} updated successfully!`,
    data: result,
  });
});

const deleteShortById = catchAsync(async (req, res) => {
  const result = await ShortServices.deleteShortByIdFromDB(req?.params?.slug);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Short with ID ${result?._id} deleted successfully!`,
    data: null,
  });
});

export const ShortControllers = {
  createShort,
  getShorts,
  updateShortById,
  deleteShortById,
};
