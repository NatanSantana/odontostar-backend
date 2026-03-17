import {registrar, lancarDatasDisponiveis, mostrarDatas, listarById, listarByCpf} from '../controller/DentistasController.ts';
import { Router } from 'express';

const router = Router();

router.post('/registrar-dentista', registrar)
router.post('/lancar-datas', lancarDatasDisponiveis)
router.get('/mostrar-datas', mostrarDatas)
router.get('/listar-dentista', listarById)
router.get('/dentistabycpf', listarByCpf)

export default router;