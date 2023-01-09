import { Pipe, PipeTransform } from '@angular/core';
import { PoolEtcBlocksLoaderType } from "@blockchain_client/graph-ql-client";
import { AgChartOptions, time } from "ag-charts-community";
import {
  AgCartesianSeriesTooltipRendererParams,
  AgTooltipRendererResult
} from "ag-charts-community/dist/cjs/es5/chart/agChartOptions";
import * as moment from "moment";
import { siSymbol } from "../../utils/si-symbol";
@Pipe({
  name: 'chartPoolEtcBlocksOptions'
})
export class ChartPoolEtcBlocksOptionsPipe implements PipeTransform {
  renderer(params: AgCartesianSeriesTooltipRendererParams): string | AgTooltipRendererResult {
    return {
      title: params.title,
      content: `
        <div>
          <div>${moment(params.xValue).format('L LTS')}</div>
          <div>${siSymbol(params.yValue, 'H')}</div>
          <div>Number: ${params.datum.height}</div>
          <div>Reward: ${params.datum.reward.toFixed(8)}</div>
          <div>Variance: ${(params.datum.sharesDiff * 100).toFixed(2)}%</div>
        </div>
      `
    }
  }
  transform(data: PoolEtcBlocksLoaderType): AgChartOptions {
    if (!data?.luckCharts) return {}
    return {
      title: {
        enabled: false
      },
      subtitle: {
        text: moment().format('L LTS')
      },
      data: data?.luckCharts || [],
      series: [
        {
          xKey: 'x',
          yKey: 'difficulty',
          xName: 'Date-Time',
          yName: 'Difficulty',
          marker: {
            enabled: true,
          },
          tooltip: {
            enabled: true,
            renderer: this.renderer
          }
        },
        {
          xKey: 'x',
          yKey: 'shares',
          xName: 'Date-Time',
          yName: 'Shares',
          marker: {
            enabled: true
          },
          tooltip: {
            enabled: true,
            renderer: this.renderer
          }
        },
      ],
      axes: [
        {
          type: 'number',
          position: 'left',
          keys: ['difficulty', 'shares'],
          title: {
            enabled: false,
          },
          label: {
            formatter: (params) => {
              return siSymbol(params.value, 'H');
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
            count: time.minute.every(30)
          },
          label: {
            formatter: (params) => {
              return moment(params.value).format('L LTS');
            }
          }
        }
      ]
    }
  }
}
