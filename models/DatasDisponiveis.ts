import { Schema, model } from "mongoose";



const datasConsultaSchema = new Schema({ 
    data: { type: Date, required: true },
    dentista: { type: Schema.Types.ObjectId, ref: 'Dentista', required: true },
    horario: { type: String, required: true },
    consultorio: {type: String},
    marcada: {type: Boolean}
});

export default model('DatasConsulta', datasConsultaSchema);