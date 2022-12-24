import { Component, Input } from "@angular/core";
import { ChartConfiguration } from "chart.js";
import { LineChartData } from "../line-chart-data";

@Component({
  selector: 'line-area-chart',
  templateUrl: './line-area-chart.component.html',
  styleUrls: ['./line-area-chart.component.scss']
})
export class LineAreaChartComponent {
  public datasets: ChartConfiguration<'line'>['data']['datasets'] = [];
  public labels: ChartConfiguration<'line'>['data']['labels'] = [];

  @Input()
  set value(data: LineChartData | undefined) {
    if (JSON.stringify(this.labels) !== JSON.stringify(data?.labels)) {
      this.labels = data?.labels;
    }
    const dataset = data?.dataset;
    const tmpDatasets = Object.entries(dataset || {}).map(([label, data]) => {
      return {
        label,
        data,
        fill: true,
        borderColor: '#5EEAD4',
        backgroundColor: 'rgba(94,234,212, .2)'
      }
    });

    this.datasets = tmpDatasets.map((value, key) => {
      if (
        value.label !== this.datasets[key]?.label ||
        JSON.stringify(value.data) !== JSON.stringify(this.datasets[key].data)
      ) {
        return {
          ...value,
          label: tmpDatasets[key].label,
          data: value.data
        }
      }
      return this.datasets[key];
    })
  }

  @Input()
  options: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false,
      },
      tooltip: {
        mode: 'index'
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    scales: {
      x: {
        title: {
          display: false
        }
      },
      y: {
        stacked: true,
        title: {
          display: false
        }
      }
    }
  };
}
