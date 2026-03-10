import { isAfter, addDays } from "date-fns";

function buscarDados(data: any[], dataDesejada: string) {
  if (!data) throw new Error('Não foi possível encontrar a cidade.');

  const cincoDias = addDays(new Date(), 5);

  if (isAfter(new Date(dataDesejada), cincoDias)) {
    throw new Error('Não há previsão para o dia desejado: ' + dataDesejada);
  }

  const item = data.find(item => item.dt_txt.startsWith(dataDesejada));

  if (!item) throw new Error('Não foi possível encontrar a previsão para a data desejada.');

  return {
    temp: item.main.temp,
    desc: item.weather[0].description,
    dia: dataDesejada
  };
}

export { buscarDados };