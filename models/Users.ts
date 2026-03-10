import { Schema, model } from "mongoose";

const userSchema = new Schema({ 
    nomeCompleto: { type: String, required: true },
    cpf : { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    cep: { type: String, required: true },
    numeroCasa: { type: String, required: true },
    bairro: { type: String, required: true },
    cidade: { type: String, required: true },
    logradouro: { type: String, required: true },
    telefone: { type: String, required: true },
    dataNascimento: { type: Date, required: true },
    role: {type: String}
});

export default model('User', userSchema);