import Dentistas from "../models/Dentistas.ts";
import DatasDisponiveis from "../models/DatasDisponiveis.ts";
import { parse, isBefore, isValid, isAfter, addHours, addMinutes } from "date-fns";




async function registrarDentista(data: any) {
        const dentista = new Dentistas(data);
        if (isNaN(Number(dentista.consultorio))) {
            throw new Error('Número do consultório deve ser um número válido.');
        }
        await dentista.save();
        return dentista;
    
};


async function lancarDatas(data: any) {
    const horarioMaximo = parse("17:00", "HH:mm", new Date())
    const horarioMinimo = parse("08:00", "HH:mm", new Date())
    const horaConsulta = parse(data.horario, "HH:mm", new Date())
    data.data = addHours(data.data, horaConsulta.getHours())
    data.data = addMinutes(data.data, horaConsulta.getMinutes());
    data.marcada = false;

    const datas = new DatasDisponiveis(data);
    if (isBefore(datas.data, new Date())) {
        throw new Error("Não é possível marcar uma data que já passou")
    }

    const horarioRecebido = parse(datas.horario, "HH:mm", new Date())

    if (!isValid(horarioRecebido)) {
        throw new Error(horarioRecebido + " Este formato de horário não é permitido")

    }

    if (isAfter(horarioRecebido, horarioMaximo) || isBefore(horarioRecebido, horarioMinimo)) {
        throw new Error("Um horário só pode ser registrado se for DEPOIS das 08:00 e ANTES das 17:00")
    }

    const dentistaBuscado = await Dentistas.findOne({ _id: datas.dentista  });
    if (!dentistaBuscado) {
        throw new Error("Não foi possível encontrar o Dentista procurado")
    }

    return await datas.save();

}

async function mostrarDatasByEspecialidade(especialidadeRecebida: any) {
    
    const datasVencidas = await DatasDisponiveis.deleteMany({ data: { $lt: new Date() } });

    const dentistaByEspecialidade = await Dentistas.findOne({ especialidade: especialidadeRecebida })
    if (!dentistaByEspecialidade) {
        throw new Error("Não há dentistas com essa especialidade")
    }

    const datas = await DatasDisponiveis.find({ dentista: dentistaByEspecialidade._id, marcada: false }).populate('dentista');
    
    if (datas.length === 0) {
        throw new Error("Não há Datas Disponíveis")
    }

    
    return datas;
}



async function listarDentistaById(id: any) {
    const dentista = await Dentistas.findOne( { _id: id });
    if (!dentista) {
        throw new Error("Não foi possível encontrar um dentista com esse ID")
    }
    return dentista;

}






export { registrarDentista, lancarDatas, mostrarDatasByEspecialidade, listarDentistaById };