const HexTypo = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
];
const convertDeci2Hex = function (decimal: number) {
  const one = HexTypo[Math.floor(decimal / 16)];
  const zero = HexTypo[decimal % 16];
  return '' + one + zero;
};

export const makeRandomColor = function () {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const yellow = Math.floor(Math.random() * 256);
  const rgb = [red, green, yellow];
  return rgb.reduce((acc, val) => acc + convertDeci2Hex(val), '#');
};
