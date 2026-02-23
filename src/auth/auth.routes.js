import { Router } from 'express';
import { register, verifyAccount, login } from './auth.controller.js';

const router = Router();

router.post('/register', register);
router.get('/verify/:token', verifyAccount);
router.post('/login', login);

export default router;