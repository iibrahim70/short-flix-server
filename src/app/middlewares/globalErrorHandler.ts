/* eslint-disable @typescript-eslint/no-unused-vars */

import { env } from '@/config';
import {
  ApiError,
  handleCastError,
  handleDuplicateError,
  handleValidationError,
} from '@/errors';
import { handleZodError } from '@/errors/handleZodError';
import { ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';
import { ZodError } from 'zod';

// Error handler middleware for handling global errors
export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  // Setting default values for the response
  let statusCode = err?.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  let message = err?.message || httpStatus['500_MESSAGE'];
  let errorDetails = [
    {
      path: '',
      message: err?.message || httpStatus['500_MESSAGE'],
    },
  ];

  // Handling Zod validation errors
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorDetails = simplifiedError?.errorDetails;
  }

  // Handling mongoose validation errors
  else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorDetails = simplifiedError?.errorDetails;
  }

  // Handling duplicate errors
  else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorDetails = simplifiedError?.errorDetails;
  }

  // Handling Cast errors
  else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorDetails = simplifiedError?.errorDetails;
  }

  // Handling ApiErrors (custom error class)
  else if (err instanceof ApiError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorDetails = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  // Handling general errors (instances of Error)
  else if (err instanceof Error) {
    message = err?.message;
    errorDetails = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  // Returning the error response
  res.status(statusCode).json({
    success: false,
    message,
    errorDetails,
    stack: env.nodeEnv === 'development' ? err?.stack : null,
  });
};
