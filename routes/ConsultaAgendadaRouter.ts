import { Router } from 'express';
import { registrar, marcarRealizada, mostrarConsultasPendentes, desmarcarConsulta, mostrarConsultasByCpf } from '../controller/ConsultaAgendadaController.ts';

const router = Router();

router.post('/registrar-consulta', registrar)
router.post('/marcar-realizada', marcarRealizada)
router.get('/buscar-consultaspendentes', mostrarConsultasPendentes)
router.get('/buscar-consultasbycpf', mostrarConsultasByCpf)
router.delete('/desmarcar-consulta', desmarcarConsulta)

export default router;