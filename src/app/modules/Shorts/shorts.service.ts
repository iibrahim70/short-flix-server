import httpStatus from 'http-status';
import { IShort } from './shorts.interface';
import { Short } from './shorts.model';
import { ApiError } from '@/errors';
import { getVideoDurationInSeconds } from 'get-video-duration';
import colors from 'colors';
import { appLogger } from '@/logger';

const createShortToDB = async (payload: IShort) => {
  try {
    const duration = await getVideoDurationInSeconds(payload?.videoUrl);
    payload.duration = duration;
  } catch (error) {
    appLogger.error(
      colors.red.bold(`❌ Error fetching video duration: ${error}`),
    );
  }

  const result = await Short.create(payload);
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

  // If videoUrl is updated, fetch new duration
  if (payload?.videoUrl) {
    try {
      const duration = await getVideoDurationInSeconds(payload.videoUrl);
      payload.duration = duration;
    } catch (error) {
      appLogger.error(
        colors.red.bold(`❌ Error fetching video duration: ${error}`),
      );
    }
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
