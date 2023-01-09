import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment";
@Pipe({
  name: 'momentDiff'
})
export class MomentDiffPipe implements PipeTransform {
  transform(timestamp1: number, timestamp2?: number): string {
    const moment1 = moment(timestamp1);
    const moment2 = timestamp2 ? moment(timestamp2) : moment();
    return moment1.from(moment2);
  }

}
