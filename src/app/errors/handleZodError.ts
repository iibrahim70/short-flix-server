import { ZodError } from 'zod';
import httpStatus from 'http-status';
import { IErrorResponse } from '@/interfaces/error.interface';

export const handleZodError = (err: ZodError): IErrorResponse => {
  const errorDetails = err?.issues?.map((issue) => {
    return {
      path: String(issue?.path[issue?.path?.length - 1]),
      message: issue?.message,
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
