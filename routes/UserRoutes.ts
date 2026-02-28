import { Router } from 'express';
import { createUser, login } from '../controller/UserController.ts';

const router = Router();

router.post('/register-user', createUser);
router.post('/login-user', login);

export default router;