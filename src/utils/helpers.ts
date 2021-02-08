import { IVoivodeship } from '../data/form';

const colorList = [
  'rgb(0,35,255)',
  'rgb(8,103,46)',
  'rgb(134,120,36)',
  'rgb(122,24,24)',
  'rgb(72,155,155)',
  'rgb(117,17,153)',
  'rgb(200,130,123)',
  'rgb(36,32,32)',
  'rgb(38,75,102)',
  'rgb(255,99,132)',
  'rgb(58,96,9)',
  'rgb(105,176,176)',
  'rgb(255,150,2)',
  'rgb(47,1,72)',
  'rgb(140,135,135)',
];

//
// export const getVoivodeshipById = (id: number): string | undefined =>
//   voivodeships.find((v) => v.id === id)?.name;

export const getRandomColor = (i: number): string => {
  if (i < 15) {
    return colorList[i];
  }
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

export const createArrayFromRange = (start: number, end: number): number[] => {
  return Array.from({ length: end - start + 1 }, (v, k) => k + start);
};
