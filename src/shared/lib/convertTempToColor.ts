export const converTemtToNumber = (index: number, array: number[]) => {
  const temp =
    index === -1
      ? array[0]
      : array[index] === undefined
      ? array[array.length - 1]
      : array[index];
  let x = Math.floor(temp) - 20;
  if (x > 100) x = 100;
  else if (x < 0) x = 0;

  if (x > 255) {
    x = 255;
  }
  let color = x;
  let colorWall = "rgb(" + (255 - color) + ", 0, " + 0 + ")"; // цвет

  return colorWall;
};
