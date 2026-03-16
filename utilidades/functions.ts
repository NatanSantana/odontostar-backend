function montarData(data: string, horario: string): Date {
  const [horas, minutos] = horario.split(':');
  const dataCompleta = new Date(data + 'T00:00:00.000Z');
  dataCompleta.setUTCHours(Number(horas), Number(minutos), 0, 0);
  return dataCompleta;
}

export {montarData}