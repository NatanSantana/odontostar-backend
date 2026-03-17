import {registrar, lancarDatasDisponiveis, mostrarDatas, listarById, listarByCpf} from '../controller/DentistasController.ts';
import { Router } from 'express';
import { autorizarRole } from '../middlewares/RoleAuth.ts';
import { autenticar } from '../middlewares/auth.ts';


const router = Router();

router.post('/registrar-dentista', autorizarRole('admin') ,registrar)
router.post('/lancar-datas', autorizarRole('Dentista') ,lancarDatasDisponiveis)
router.get('/mostrar-datas',autenticar, mostrarDatas)
router.get('/listar-dentista',autenticar, listarById)
router.get('/dentistabycpf',autenticar, listarByCpf)

export default router;