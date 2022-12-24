import { Pipe, PipeTransform } from '@angular/core';
import { LineChartData } from "./line-chart-data";

@Pipe({
  name: 'lineChartFormat'
})
export class LineChartFormatPipe implements PipeTransform {

  transform(value: any[] | undefined | null = undefined, keyField: string, valueFields: [string, string][]): LineChartData | undefined {
    if (!value) return undefined;
    return value.reduce<LineChartData>((accum, data) => {
      const labels = [...accum.labels, new Date(data[keyField]).toLocaleDateString()];
      const dataset = {...accum.dataset};
      valueFields.forEach(([label, field]) => {
        dataset[label] = [...(dataset[label] || []), data[field]]
      })
      return {
        labels,
        dataset
      }
    }, {
      labels: [],
      dataset: {}
    });
  }

}
