import { Pipe, PipeTransform } from '@angular/core';
import { CmAssetsHistoryLoaderType, CmMetricsLoaderType, IMetrics } from "@blockchain_client/graph-ql-client";
import { AgChartOptions, time } from "ag-charts-community";
import * as moment from "moment/moment";
import { AgCartesianAxisOptions, AgLineSeriesOptions } from "ag-charts-community/dist/cjs/es5/chart/agChartOptions";
import { siSymbol } from "../../utils/si-symbol";
@Pipe({
  name: 'chartOptions'
})
export class ChartOptionsPipe implements PipeTransform {
  private mainAxes(metrics: IMetrics[]): AgCartesianAxisOptions[] {
    return [
      {
        type: 'number',
        position: 'left',
        keys: metrics,
        title: {
          enabled: false,
        },
        label: {
          formatter: (params) => siSymbol(params.value)
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
          count: time.day.every(1)
        }
      }
    ]
  }
  private splitAxes(metrics: IMetrics[]): AgCartesianAxisOptions[] {
    return [
      {
        type: 'number',
        position: 'left',
        keys: [metrics[0]],
        title: {
          enabled: false,
        },
        label: {
          formatter: (params) => siSymbol(params.value)
        }
      },
      {
        type: 'number',
        position: 'right',
        keys: [metrics[1]],
        title: {
          enabled: false,
        },
        label: {
          formatter: (params) => siSymbol(params.value)
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
          count: time.day.every(1)
        }
      }
    ]
  }
  transform(value: CmAssetsHistoryLoaderType, metrics: IMetrics[], metricsData?: CmMetricsLoaderType | null, split = true): AgChartOptions {
    if (!value?.ETC || !metrics?.length) {
      return {};
    }
    const metricsName: string[] = [];
    const series: AgLineSeriesOptions[] = metrics.map((metric) => {
      const desc = metricsData?.data.find(metricData => metricData.metric === metric);
      metricsName.push(desc?.display_name || desc?.full_name || metric);
      return {
        xKey: 'time',
        yKey: metric,
        xName: 'Date-Time',
        yName: desc?.display_name || metric,
        showInLegend: metrics.length > 1
      };
    });console.log(metrics, series && metrics.length === 2, this.splitAxes(metrics))
    const axes: AgCartesianAxisOptions[] = series && metrics.length === 2 ?
      this.splitAxes(metrics) : this.mainAxes(metrics)
    return {
      title: {
        enabled: false,
      },
      subtitle: {
        text: moment().format('L LTS')
      },
      data: value.ETC,
      series,
      axes
    }
  }
}
