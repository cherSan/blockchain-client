import { Pipe, PipeTransform } from '@angular/core';
import { siSymbol } from '../utils/si-symbol';
@Pipe({
  name: 'siSymbol'
})
export class SiSymbolPipe implements PipeTransform {
  transform(value?: number | string | null, suffix: string = ''): string {
    return siSymbol(value, suffix);
  };
}
