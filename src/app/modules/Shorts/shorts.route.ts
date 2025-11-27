import { Router } from 'express';
import { ShortControllers } from './shorts.controller';
import { ShortValidationSchema } from './shorts.validation';
import { validateRequest } from '@/middlewares';

const router = Router();

router
  .route('/')

  .get(ShortControllers.getShorts)
  .post(validateRequest(ShortValidationSchema), ShortControllers.createShort);

router
  .route('/:slug')

  .patch(ShortControllers.updateShortById)
  .delete(ShortControllers.deleteShortById);

export const ShortRouter = router;
