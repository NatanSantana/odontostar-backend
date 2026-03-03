import { Schema, model } from "mongoose";



const datasConsultaSchema = new Schema({ 
    data: { type: Date, required: true },
    dentista: { type: Schema.Types.ObjectId, ref: 'Dentista', required: true },
    horario: { type: String, required: true }
});

export default model('DatasConsulta', datasConsultaSchema);