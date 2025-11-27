import { CastError } from 'mongoose';
import httpStatus from 'http-status';
import { IErrorResponse } from '@/interfaces/error.interface';

export const handleCastError = (err: CastError): IErrorResponse => {
  const errorDetails = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];

  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: httpStatus['400_MESSAGE'],
    errorDetails,
  };
};
