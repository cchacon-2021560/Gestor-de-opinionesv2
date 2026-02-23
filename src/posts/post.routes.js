import { Router } from 'express';
import { createPost } from './post.controller.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';

const router = Router();

router.post('/', [validateJWT], createPost);

export default router;