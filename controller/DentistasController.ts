import {registrarDentista, lancarDatas, mostrarDatasByEspecialidade, listarDentistaById, listarDentistaByCpf } from '../service/DentistasService.ts'
import { request, type Request, type Response } from 'express';

export async function registrar(req: Request, res: Response) {
    try {
        const request = await registrarDentista(req.body);
        return res.status(201).json({ request })

    } catch(error: any) {
        res.status(500).json({error: "Não foi possível registrar o Dentista",
            message: error.message
        })
    }
    
}

export async function lancarDatasDisponiveis(req: Request, res: Response) {
    try {
        const request = await lancarDatas(req.body);
        return res.status(201).json({ request });

    } catch (error: any) {
        res.status(500).json({
            error: "Não foi possível registrar a data",
            message: error.message
        });
    }
}

export async function mostrarDatas(req: Request, res: Response) {
    try {

        const { especialidade } = req.query;
        const request = await mostrarDatasByEspecialidade(especialidade as string);
        
        return res.status(201).json({ request })

    } catch(error: any) {
        return res.status(400).json({
            message: error.message
        })
    }
}

export async function listarById(req: Request, res: Response) {
    try {

        const { id } = req.query;
        const request = await listarDentistaById(id)
        return res.status(200).json({ request })

    } catch (error: any) {
        res.status(500).json({
            error: "Não foi possível buscar Dentistas",
            message: error.message
        })
    }
}

export async function listarByCpf(req: Request, res: Response) {
    try {

        const { cpf } = req.query;
        const request = await listarDentistaByCpf(cpf)
        return res.status(200).json({ request })

    } catch (error: any) {
        res.status(500).json({
            error: "Não foi possível buscar Dentistas",
            message: error.message
        })
    }
}
