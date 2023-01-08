import { Pipe, PipeTransform } from '@angular/core';
import { AgChartOptions, time } from "ag-charts-community";
import { PoolEtcStatsLoaderType } from "@blockchain_client/graph-ql-client";
import * as moment from "moment/moment";
import { siSymbol } from "../../utils/si-symbol";

@Pipe({
  name: 'poolInformationChart'
})
export class PoolInformationChartPipe implements PipeTransform {

  transform(data: PoolEtcStatsLoaderType): AgChartOptions {
    if (!data) return {};
    return {
      title: {
        enabled: false
      },
      subtitle: {
        text: moment().format('L LTS')
      },
      series: [
        {
          xKey: 'x',
          yKey: 'y',
          xName: 'Date-Time',
          yName: 'Network Difficulty',
          data: data.netCharts
        },
        {
          xKey: 'x',
          yKey: 'y',
          xName: 'Date-Time',
          yName: 'Pool Hashrate',
          data: data.poolCharts
        },
      ],
      axes: [
        {
          type: 'number',
          position: 'left',
          keys: ['y'],
          title: {
            enabled: false,
          },
          label: {
            formatter: (params) => {
              return siSymbol(params.value, 'H/s');
            }
          }
        },
        {
          type: 'time',
          position: 'bottom',
          keys: ['x'],
          title: {
            enabled: false,
          },
          tick: {
            count: time.minute.every(1)
          }
        }
      ]
    };
  }

}
