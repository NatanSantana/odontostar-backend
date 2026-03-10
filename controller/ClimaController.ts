import { request, type Request, type Response } from 'express';
import { buscarDados } from '../service/ClimaService.ts';
import dotenv from 'dotenv';
import { format } from "date-fns";

dotenv.config();

const KEY = process.env.OPEN_WEATHER_KEY

export async function buscarDadosClima(req: Request, res: Response) {
    
    try {
        
    const { dataDesejada } = req.query;
     
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Salvador,BR&appid=${KEY}&lang=pt_br&units=metric`);
    const json = await response.json() as { list: any[] };
    
    const buscar = await buscarDados(json.list, dataDesejada as string);

    return res.status(200).json(buscar);

    } catch(error: any) {
        return res.status(500).json({error: error.message});
    }
    


}