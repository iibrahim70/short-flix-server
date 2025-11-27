import mongoose from 'mongoose';
import { IErrorResponse } from '@/interfaces/error.interface';
import httpStatus from 'http-status';

export const handleValidationError = (
  err: mongoose.Error.ValidationError,
): IErrorResponse => {
  const errorDetails = Object.values(err?.errors).map((val) => {
    return {
      path: val?.path,
      message: val?.message,
    };
  });

  // Join all paths to list the fields in error
  const fields = errorDetails?.map((e) => e?.path)?.join(', ');

  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: `Validation failed for field: ${fields}`,
    errorDetails,
  };
};
