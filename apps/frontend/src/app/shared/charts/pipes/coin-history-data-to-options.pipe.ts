import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment/moment";
import { AgChartOptions } from "ag-charts-community";
import { CoinHistory } from "../../../model-viewer/coin-details/coin-history";
import { siSymbol } from "../../../utils/si-symbol";
type Fields = {
  network_hashrate: boolean,
  difficulty: boolean,
  price: boolean
}
type Props = {
  fields: Fields,
  title: string,
  coin?: string,
  algo?: string
}
@Pipe({
  name: 'coinHistoryDataToOptions'
})
export class CoinHistoryDataToOptionsPipe implements PipeTransform {

  transform(data: CoinHistory, { fields, title, coin, algo }: Props): AgChartOptions {
    if (!data || !coin || !algo) {
      return {};
    }

    const series = [];
    if (fields.difficulty) {
      series.push({
        xKey: 'timestamp',
        yKey: 'difficulty',
        xName: 'Date',
        yName: 'Difficulty',
      })
    }
    if (fields.network_hashrate) {
      series.push({
        xKey: 'timestamp',
        yKey: 'network_hashrate',
        xName: 'Date',
        yName: 'Network Hashrate',
      })
    }
    if (fields.price) {
      series.push({
        xKey: 'timestamp',
        yKey: 'price',
        xName: 'Date',
        yName: 'Price',
      })
    }
    return  {
      title: {
        text: title || `${coin} / ${algo} History`
      },
      subtitle: {
        text: moment().format('L LTS')
      },
      data: data?.data,
      series,
      axes: [
        {
          type: 'number',
          position: 'left',
          keys: [
            'network_hashrate',
            'difficulty'
          ],
          title: {
            enabled: true,
            text: 'Hashrate / Difficulty'
          },
          label: {
            formatter: (params) => {
              return siSymbol(params.value);
            }
          }
        },
        {
          type: 'number',
          position: 'right',
          keys: ['price'],
          title: {
            enabled: true,
            text: 'USD',
          },
          label: {
            formatter: (params) => {
              return '$' + params.value.toLocaleString();
            }
          }
        },
        {
          type: 'time',
          position: 'bottom',
          keys: ['timestamp'],
          title: {
            enabled: true,
            text: 'Date-Time',
          }
        }
      ]
    };
  }

}
