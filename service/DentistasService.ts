import Dentistas from "../models/Dentistas";


async function registrarDentista(data: any) {
    try {
        const dentista = new Dentistas(data);
        if (isNaN(Number(dentista.consultorio))) {
            console.log('Número do consultório deve ser um número válido.');
            return;
        }
        await dentista.save();
    } catch (error) {
        console.error('Error ao registrar dentista:', error);
    }
};

export { registrarDentista };