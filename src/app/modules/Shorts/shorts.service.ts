import httpStatus from 'http-status';
import { IShort } from './shorts.interface';
import { Short } from './shorts.model';
import { ApiError } from '@/errors';
import { getVideoDurationInSeconds } from 'get-video-duration';
import { appLogger } from '@/logger';
import colors from 'colors';

const createShortToDB = async (payload: IShort) => {
  let duration = 0;

  try {
    duration = await getVideoDurationInSeconds(payload.videoUrl);
  } catch (error) {
    appLogger.error(
      colors.red.bold(`❌ Error fetching video duration:: ${error}`),
    );
  }

  const result = await Short.create({
    ...payload,
    duration,
  });

  return result;
};

const getShortsFromDB = async () => {
  const result = await Short.find();
  return result;
};

const updateShortByIdFromDB = async (
  slug: string,
  payload: Partial<IShort>,
) => {
  const existingShort = await Short.findById(slug);

  if (!existingShort) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `Short with ID ${slug} was not found`,
    );
  }

  const result = Short.findByIdAndUpdate(slug, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteShortByIdFromDB = async (slug: string) => {
  const existingShort = await Short.findById(slug);

  if (!existingShort) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `Short with ID ${slug} was not found`,
    );
  }

  const result = Short.findByIdAndDelete(slug);
  return result;
};

export const ShortServices = {
  createShortToDB,
  getShortsFromDB,
  updateShortByIdFromDB,
  deleteShortByIdFromDB,
};
