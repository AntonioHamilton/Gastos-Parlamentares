export const formatDate = (date: Date) => {
  const newDate = new Date(date)
  const dia = newDate.getDate().toString().padStart(2, '0');
  const mes = (newDate.getMonth() + 1).toString().padStart(2, '0');
  const ano = newDate.getFullYear();

  return `${dia}/${mes}/${ano}`;
}