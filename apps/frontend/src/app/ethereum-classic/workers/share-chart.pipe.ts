import { Pipe, PipeTransform } from '@angular/core';
import { PoolEtcMinerLoaderType } from "@blockchain_client/graph-ql-client";
import { AgChartOptions, time } from "ag-charts-community";
import * as moment from "moment";

@Pipe({
  name: 'shareChart'
})
export class ShareChartPipe implements PipeTransform {
  transform(data: PoolEtcMinerLoaderType): AgChartOptions {
    if(!data) return {};
    return {
      title: {
        text: `Share`
      },
      subtitle: {
        text: moment().format('L LTS')
      },
      data: data?.shareCharts,
      series: [
        {
          type: 'column',
          xKey: 'x',
          yKey: 'valid',
          xName: 'Date-Time',
          yName: 'Valid Share',
          stacked: true
        },
        {
          type: 'column',
          xKey: 'x',
          yKey: 'stale',
          xName: 'Date-Time',
          yName: 'Stacked',
          stacked: true,
        },
        {
          xKey: 'x',
          yKey: 'workerOnline',
          xName: 'Date-Time',
          yName: 'Workers',
          marker: {
            enabled: false
          }
        }
      ],
      axes: [
        {
          type: 'number',
          position: 'left',
          keys: ['valid', 'stale'],
          title: {
            enabled: true,
            text: 'Valid Share'
          }
        },
        {
          type: 'number',
          position: 'right',
          keys: ['workerOnline'],
          title: {
            enabled: true,
            text: 'Workers Online / Stale',
          }
        },
        {
          type: 'time',
          position: 'bottom',
          keys: ['x'],
          title: {
            enabled: true,
            text: 'Date-Time',
          },
          tick: {
            count: time.minute.every(2)
          }
        }
      ]
    };
  }

}
