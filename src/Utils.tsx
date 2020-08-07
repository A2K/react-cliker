
export function formatNumber(number: number): string
{
  if (Math.trunc(number) === number)
  {
    let str = number.toFixed(0);
    if (str.endsWith('0'))
    {
      let power = 1;
      for (let i = str.length - 2; i > 0; i--)
      {
        if (str[i] === '0') power++;
      }
      if (power >= 12 && power <= 14) {
        return number / 1000000000000 + ' trillion';
      }
      if (power >= 9 && power <= 11) {
        return number / 1000000000 + ' billion';
      }
      if (power >= 6 && power <= 8) {
        return number / 1000000 + ' million';
      }
    }
  }
  const formatter = Intl.NumberFormat('en-US');
  return formatter.format(number) as string;
  //return number.toFixed(0);
}