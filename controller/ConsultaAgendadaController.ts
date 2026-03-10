import { registrarConsulta, marcarComoRealizada, listarConsultasPendentes } from "../service/ConsultaAgendadaService.ts";
import { request, type Request, type Response } from 'express';

export async function registrar(req: Request, res: Response) {
    try {
        const objetoConsulta = req.body;
    const consulta = await registrarConsulta(objetoConsulta); 
    return res.status(200).json({message: consulta})
    } catch(error: any) {
        res.status(400).json({error: error.message})
    }
    
}

export async function marcarRealizada(req: Request, res: Response) {
    try {
        const dados = req.body;
        const buscarConsulta = await marcarComoRealizada(dados);
        res.status(200).json({message: buscarConsulta})
    } catch(error: any) {
        res.status(404).json({message: error.message})
    }

}

export async function mostrarConsultasPendentes(req: Request, res: Response) {
    try {
        const consultas = await listarConsultasPendentes();
        res.status(200).json(consultas)
    } catch(error: any) {
        res.status(404).json({error: error.message})
    }

}