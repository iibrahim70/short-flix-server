import { CorsOptions } from 'cors';
import httpStatus from 'http-status';
import { ApiError } from '@/errors';
import { env } from './env.config';

// whitelist of allowed origins for CORS
const whitelist = env.corsOrigin;

// CORS options to allow requests only from whitelisted origins
export const corsConfig: CorsOptions = {
  origin: function (origin, callback) {
    if (whitelist?.indexOf(origin as string) !== -1 || !origin) {
      callback(null, true); // Allow request
    } else {
      callback(
        // Deny request
        new ApiError(
          httpStatus.FORBIDDEN,
          'CORS request strictly prohibited from this origin',
        ),
      );
    }
  },
};
