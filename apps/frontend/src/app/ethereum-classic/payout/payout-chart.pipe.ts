import { Pipe, PipeTransform } from '@angular/core';
import { PoolEtcMinerLoaderType } from "@blockchain_client/graph-ql-client";
import { AgChartOptions } from "ag-charts-community";
import * as moment from "moment/moment";
@Pipe({
  name: 'payoutChart'
})
export class PayoutChartPipe implements PipeTransform {
  transform(data: PoolEtcMinerLoaderType): AgChartOptions {
    if(!data) return {};
    return {
      title: {
        enabled: false
      },
      subtitle: {
        text: moment().format('L LTS')
      },
      data: data.paymentCharts || [],
      series: [
        {
          type: 'column',
          xKey: 'x',
          yKey: 'amount',
          xName: 'Date-Time',
          yName: 'Payment Series'
        },
      ],
      axes: [
        {
          type: 'number',
          position: 'left',
          keys: ['amount'],
          title: {
            enabled: true,
            text: 'Payment By Account'
          }
        },
        {
          type: 'category',
          position: 'bottom',
          keys: ['x'],
          title: {
            enabled: true,
            text: 'Date-Time',
          },
          label: {
            formatter: (param) => {
              return moment(parseInt(param.value)).format('L')
            }
          }
        }
      ]
    }
  }

}
