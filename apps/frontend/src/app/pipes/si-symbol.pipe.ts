import { Pipe, PipeTransform } from '@angular/core';
import { transform } from '../utils/si-symbol';
@Pipe({
  name: 'siSymbol'
})
export class SiSymbolPipe implements PipeTransform {
  transform: (value?: number | string | null) => string = transform;
}
