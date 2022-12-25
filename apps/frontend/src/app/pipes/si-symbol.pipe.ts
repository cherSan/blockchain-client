import { Pipe, PipeTransform } from '@angular/core';

type Exponent = -24 | -21 | -18 | -15 | -12 | -9 | -6 | -3 | 0 | 3 | 6 | 9 | 12 | 15 | 18 | 21 | 24;

interface Prefixes {
  [key: number]: string
}

@Pipe({
  name: 'siSymbol'
})
export class SiSymbolPipe implements PipeTransform {
  private prefixes: Prefixes = {
    '24': 'Y',
    '21': 'Z',
    '18': 'E',
    '15': 'P',
    '12': 'T',
    '9': 'G',
    '6': 'M',
    '3': 'k',
    '0': '',
    '-3': 'm',
    '-6': 'µ',
    '-9': 'n',
    '-12': 'p',
    '-15': 'f',
    '-18': 'a',
    '-21': 'z',
    '-24': 'y'
  };
  transform(value?: number | string | null): string {
    if (value === null || typeof value !== 'number' && typeof value !== 'string') {
      return 'NaN'
    }

    const num =  parseFloat(`${value}`);

    if (num === 0) {
      return '0';
    }
    let sig = Math.abs(num);
    let exponent: Exponent = 0;

    while (sig >= 1000 && exponent < 24) {
      sig /= 1000;
      exponent += 3;
    }
    while (sig < 1 && exponent > -24) {
      sig *= 1000;
      exponent -= 3;
    }

    const signPrefix = num < 0 ? '-' : '';
    if (sig > 1000) {
      return signPrefix + sig.toFixed(0) + this.prefixes[exponent as keyof Prefixes];
    }
    return signPrefix + parseFloat(sig.toPrecision(3)) + this.prefixes[exponent as keyof Prefixes];

  }

}
