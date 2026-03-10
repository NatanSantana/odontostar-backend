import { Router } from 'express';
import { buscarDadosClima } from '../controller/ClimaController.ts';

const router = Router();

router.get('/previsao-clima', buscarDadosClima);

export default router