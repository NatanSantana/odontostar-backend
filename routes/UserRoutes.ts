import { Router } from 'express';
import { createUser, login, buscarUserCpf } from '../controller/UserController.ts';

const router = Router();

router.post('/register-user', createUser);
router.post('/login-user', login);
router.get('/findBy', buscarUserCpf)

export default router;