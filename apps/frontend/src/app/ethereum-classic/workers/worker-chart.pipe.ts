import { Pipe, PipeTransform } from '@angular/core';
import { AgChartOptions, time } from "ag-charts-community";
import { PoolEtcMinerLoaderType } from "@blockchain_client/graph-ql-client";
import * as moment from "moment";
import { siSymbol } from "../../utils/si-symbol";

@Pipe({
  name: 'workerChart'
})
export class WorkerChartPipe implements PipeTransform {
  transform(data: PoolEtcMinerLoaderType): AgChartOptions {
    if(!data) return {};
    return {
      title: {
        text: `Workers Hashrate`
      },
      subtitle: {
        text: moment().format('L LTS')
      },
      data: data?.minerCharts,
      series: [
        {
          xKey: 'x',
          yKey: 'minerHash',
          xName: 'Date-Time',
          yName: 'Miner Hashrate',
        },
        {
          xKey: 'x',
          yKey: 'minerLargeHash',
          xName: 'Date-Time',
          yName: 'Lage Hashrate',
        },
        {
          xKey: 'x',
          yKey: 'workerOnline',
          xName: 'Date-Time',
          yName: 'Workers',
        }
      ],
      axes: [
        {
          type: 'number',
          position: 'left',
          keys: ['minerHash', 'minerLargeHash'],
          title: {
            enabled: true,
            text: 'Workers Hashrate'
          },
          label: {
            formatter: (params) => {
              return siSymbol(params.value, 'H/s');
            },
          },
        },
        {
          type: 'number',
          position: 'right',
          keys: ['workerOnline'],
          title: {
            enabled: true,
            text: 'Workers Online',
          },
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
    }
  }

}
