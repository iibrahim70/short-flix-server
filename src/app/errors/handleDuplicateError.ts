/* eslint-disable @typescript-eslint/no-explicit-any */

import { IErrorResponse } from '@/interfaces/error.interface';
import httpStatus from 'http-status';

export const handleDuplicateError = (err: any): IErrorResponse => {
  // Try to extract key and value from the error object
  const key = Object.keys(err?.keyPattern || {})[0];
  const value = err?.keyValue?.[key];

  const errorDetails = [
    {
      path: key,
      message: `'${value}' is already exists`,
    },
  ];

  return {
    statusCode: httpStatus.CONFLICT,
    message: `Conflict: The value '${value}' for '${key}' is already in use.`,
    errorDetails,
  };
};
