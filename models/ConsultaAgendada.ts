import {Schema, model} from "mongoose"

const consultaAgendadaSchema = new Schema({
    nomePaciente: {type: String, required: true},
    cpf: {type: String, required: true},
    email: {type: String, required: true},
    procedimento: {type: String, required: true},
    data: {type: Date, required: true},
    hora: {type: String, required: true},
    realizada: {type: Boolean, required: true}
})

export default model('ConsultaAgendada', consultaAgendadaSchema);