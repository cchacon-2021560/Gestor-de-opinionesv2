import { Router } from 'express';
import { updateProfile } from './user.controller.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';
import { getUserHistory } from './user.controller.js';

const router = Router();

router.put('/profile', [validateJWT], updateProfile);

router.get('/history/:id', [validateJWT], getUserHistory);

export default router;
