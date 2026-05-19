export const dataset = [
  {
    valor: 59,
    month: 'Jan',
  },
  {
    valor: 50,
    month: 'Fev',
  },
  {
    valor: 47,
    month: 'Mar',
  },
  {
    valor: 54,
    month: 'Abr',
  },
  {
    valor: 57,
    month: 'Mai',
  },
  {
    valor: 60,
    month: 'Jun',
  },
  {
    valor: 59,
    month: 'Jul',
  },
  {
    valor: 65,
    month: 'Ago',
  },
  {
    valor: 51,
    month: 'Set',
  },
  {
    valor: 60,
    month: 'Out',
  },
  {
    valor: 67,
    month: 'Nov',
  },
  {
    valor: 61,
    month: 'Dez',
  },
];

export function valueFormatter(value: number | null) {
  return `R$ ${value}`;
}