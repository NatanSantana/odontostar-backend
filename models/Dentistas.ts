import { Schema, model } from "mongoose";

const dentistaSchema = new Schema({
    nomeCompleto: { type: String, required: true },
    especialidade: { type: String, required: true },
    consultorio: { type: String, required: true },
    cpf: {type: String, required: true}
});

export default model('Dentista', dentistaSchema);