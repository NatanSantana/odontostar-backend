import { Router } from 'express';
import { registrar, marcarRealizada, mostrarConsultasPendentes, desmarcarConsulta, mostrarConsultasByCpf } from '../controller/ConsultaAgendadaController.ts';
import { autenticar } from '../middlewares/auth.ts';

const router = Router();

router.post('/registrar-consulta', autenticar, registrar)
router.post('/marcar-realizada', autenticar, marcarRealizada)
router.get('/buscar-consultaspendentes',autenticar, mostrarConsultasPendentes)
router.get('/buscar-consultasbycpf',autenticar, mostrarConsultasByCpf)
router.delete('/desmarcar-consulta',autenticar, desmarcarConsulta)

export default router;