import  ConsultaAgendada  from '../models/ConsultaAgendada.ts'
import Dentistas from "../models/Dentistas.ts";
import DatasDisponiveis from "../models/DatasDisponiveis.ts";
import {addHours, addMinutes, parse, isAfter, format} from "date-fns";
import { Types } from 'mongoose';


async function registrarConsulta(data: any) {
    if(!data) throw new Error("Nenhum campo de consulta pode ser null");
    data.data = parse(data.data, 'dd/MM/yyyy', new Date());


    const consulta = new ConsultaAgendada(data);
    
    if(!consulta.email.endsWith("@gmail.com")) throw new Error("Email inválido")
    
    const consultaDuplicada = await ConsultaAgendada.findOne({ data: data.data, hora: data.hora, procedimento: data.procedimento });
    if (consultaDuplicada) throw new Error("Já existe uma Consulta Marcada para esse horário")

    const [horas, minutos] = data.hora.split(':');
    const dataBase = new Date(data.data); 
    const dataMontada = addMinutes(addHours(dataBase, Number(horas)), Number(minutos));

    consulta.data = dataMontada;

    const atualizarHorarioMarcado = await DatasDisponiveis.findOneAndUpdate(
        { data: dataMontada, horario: data.hora, dentista: new Types.ObjectId(data.dentistaId) }, { marcada: true }
    )
    
    if (!atualizarHorarioMarcado) {
        throw new Error("Não existe consulta com essas informações")
    }

    const existDentista = await Dentistas.findOne({ _id: new Types.ObjectId(data.dentistaId) })
    if (!existDentista) {
        throw new Error("O id do dentista não existe")
    }

    consulta.nomeDentista = existDentista.nomeCompleto;
    await consulta.save()
    console.log("Consulta Registrada: " + consulta);
    return ("Consulta Marcada com Sucesso");
}

async function marcarComoRealizada(data: any) {

    const dataConvertida = parse(data.diaConsulta, 'dd/MM/yyyy', new Date());
    const dataFormatada = format(dataConvertida, 'yyyy-MM-dd');
    data.diaConsulta = dataFormatada

    const horaConsulta = parse(data.hora, "HH:mm", new Date())
    data.diaConsulta = addHours(data.diaConsulta, horaConsulta.getHours());
    data.diaConsulta = addMinutes(data.diaConsulta, horaConsulta.getMinutes());

    if (isAfter(data.diaConsulta, new Date())) {
        throw new Error("Não é possível marcar uma consulta como realizada antes da data prevista da consulta")
    }

    const consulta = await ConsultaAgendada.findOneAndUpdate({cpf: data.cpfPaciente, data: data.diaConsulta, hora: data.hora}, 
        {realizada: true}, 
        { returnDocument: 'after' })
    if (!consulta) throw new Error("Não foi encontrada nenhuma consulta com esse cpf") 
    
    return ("Consulta Marcada Como Realizada")
}

async function listarConsultasPendentes() {
    const consultas = await ConsultaAgendada.find({realizada: false})
    if (consultas.length === 0) throw new Error("Não há consultas")
    return consultas
}

async function cancelarConsulta(data: any) {
    const dataConvertida = parse(data.diaConsulta, 'dd/MM/yyyy', new Date());
    const dataFormatada = format(dataConvertida, 'yyyy-MM-dd');
    data.diaConsulta = dataFormatada

    const horaConsulta = parse(data.hora, "HH:mm", new Date())
    data.diaConsulta = addHours(data.diaConsulta, horaConsulta.getHours());
    data.diaConsulta = addMinutes(data.diaConsulta, horaConsulta.getMinutes());

    const consultaDeletada = await ConsultaAgendada.findOneAndDelete({cpf: data.cpfPaciente, data: data.diaConsulta, hora: data.hora})
    if (!consultaDeletada) throw new Error("Não foi possível encontrar uma consulta com esses dados")

    return ("Consulta Desmarcada")

}

async function listarConsultasByCpf(cpfPaciente: string) {
    const consultas = await ConsultaAgendada.find({realizada: false, cpf: cpfPaciente})
    if (consultas.length === 0) throw new Error("Não há consultas")
    return consultas
}


export {registrarConsulta, marcarComoRealizada, listarConsultasPendentes, cancelarConsulta, listarConsultasByCpf}
