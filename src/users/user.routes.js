import { Router } from 'express';
import { updateProfile } from './user.controller.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';

const router = Router();

router.put('/profile', [validateJWT], updateProfile);

export default router;