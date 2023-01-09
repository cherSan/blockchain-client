import { Component, Input } from "@angular/core";
import { AgChartOptions, time } from "ag-charts-community";
@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  private defaultOptions: AgChartOptions = {
    background: {
      visible: true,
      fill: '#141414'
    },
    theme: {
      baseTheme: 'ag-vivid-dark',
      overrides: {
        column: {
          navigator: { enabled: true },
        },
        area: {
          axes: {
            time: {
              tick: {
                count: time.minute.every(1)
              }
            },
            number: {
              tick: {
                count: 2
              }
            }
          },
          autoSize: true,
          series: {
            marker: {
              enabled: false
            }
          }
        },
        line: {
          axes: {
            time: {
              tick: {
                count: time.day.every(1)
              }
            },
            number: {
              tick: {
                count: 100
              }
            }
          },
          autoSize: true,
          series: {
            marker: {
              enabled: false
            }
          }
        }
      }
    },
    padding: {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10
    },
    axes: [
      {
        position: 'left',
        type: 'number'
      },
      {
        position: 'bottom',
        type: 'time'
      }
    ],
    series: [],
  }
  public options: AgChartOptions = this.defaultOptions;
  @Input('options')
  set setOptions(options: AgChartOptions) {
    const newOptions: unknown = {
      ...this.defaultOptions,
      ...(options || {})
    };
    this.options = {
      ...(newOptions as AgChartOptions)
    }
  }
}
