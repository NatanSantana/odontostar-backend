import  ConsultaAgendada  from '../models/ConsultaAgendada.ts'
import {addHours, addMinutes, parse, isAfter, format} from "date-fns";

async function registrarConsulta(data: any) {
    if(!data) throw new Error("Nenhum campo de consulta pode ser null");

    const horaConsulta = parse(data.hora, "HH:mm", new Date())
    data.data = addHours(data.data, horaConsulta.getHours());
    data.data = addMinutes(data.data, horaConsulta.getMinutes());

    const consulta = new ConsultaAgendada(data);
    
    if(!consulta.email.endsWith("@gmail.com")) throw new Error("Email inválido")
    
    const consultaDuplicada = await ConsultaAgendada.findOne({ data: data.data, hora: data.hora, procedimento: data.procedimento });
    if (consultaDuplicada) return ("Já existe uma Consulta Marcada para esse horário")

    await consulta.save()
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

export {registrarConsulta, marcarComoRealizada, listarConsultasPendentes}