import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {

  transform(value: number | string, format: string = 'L LTS'): unknown {
    const timestamp = typeof value === "string" ? parseFloat(value) : value;
    return moment(timestamp).format(format);
  }

}
