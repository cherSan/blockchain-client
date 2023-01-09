import { Pipe, PipeTransform } from '@angular/core';
import { AgChartOptions, time } from "ag-charts-community";
import { CmAssetsPriceHistoryLoaderType, IAssets } from "@blockchain_client/graph-ql-client";
import * as moment from "moment";
@Pipe({
  name: 'chartOptions'
})
export class ChartOptionsPipe implements PipeTransform {
  transform(value?: CmAssetsPriceHistoryLoaderType, coin?: IAssets): AgChartOptions {
    if (!value || !coin) {
      return {}
    }
    return {
      title: {
        text: `${coin} Price History (last 5 hours)`
      },
      subtitle: {
        text: moment().format('L LTS')
      },
      data: value[coin],
      series: [
        {
          xKey: 'time',
          yKey: 'ReferenceRateUSD',
          xName: 'Date-Time',
          yName: 'USD'
        },
        {
          xKey: 'time',
          yKey: 'ReferenceRateEUR',
          xName: 'Date-Time',
          yName: 'EUR'
        }
      ],
      axes: [
        {
          type: 'number',
          position: 'left',
          keys: ['ReferenceRateUSD'],
          title: {
            enabled: false,
          },
          label: {
            formatter: (params) => {
              return '$' + params.value.toLocaleString();
            }
          }
        },
        {
          type: 'number',
          position: 'right',
          keys: ['ReferenceRateEUR'],
          title: {
            enabled: false,
          },
          label: {
            formatter: (params) => {
              return '€' + params.value.toLocaleString();
            }
          }
        },
        {
          type: 'time',
          position: 'bottom',
          keys: ['time'],
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
