import { Router } from 'express';
import { ShortRouter } from '../modules/Shorts/shorts.route';

const router = Router();

const routes = [{ path: '/shorts', route: ShortRouter }];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
