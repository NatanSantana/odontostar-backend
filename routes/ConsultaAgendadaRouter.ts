import { Router } from 'express';
import { registrar, marcarRealizada, mostrarConsultasPendentes } from '../controller/ConsultaAgendadaController.ts';

const router = Router();

router.post('/registrar-consulta', registrar)
router.post('/marcar-realizada', marcarRealizada)
router.get('/buscar-consultaspendentes', mostrarConsultasPendentes)

export default router;