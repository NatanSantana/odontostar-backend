import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/UserRoutes.ts';
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());

const mongoKey: string = process.env.MONGO_URI || '';

async function conectarMongoDB() {  
    try {
        await mongoose.connect(mongoKey);
    console.log('Conectado ao MongoDB');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
    }
}
conectarMongoDB();

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

app.use('/api', userRoutes);




