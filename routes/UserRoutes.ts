import { Router } from 'express';
import { createUser, login, buscarUserCpf } from '../controller/UserController.ts';
import { autenticar } from '../middlewares/auth.ts';

const router = Router();

router.post('/register-user', createUser);
router.post('/login-user', login);
router.get('/findBy', autenticar, buscarUserCpf)

export default router;