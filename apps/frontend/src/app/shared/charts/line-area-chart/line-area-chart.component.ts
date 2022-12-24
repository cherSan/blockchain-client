import { Component, Input } from "@angular/core";
import { ChartConfiguration } from "chart.js";

@Component({
  selector: 'line-area-chart',
  templateUrl: './line-area-chart.component.html',
  styleUrls: ['./line-area-chart.component.scss']
})
export class LineAreaChartComponent {
  private dataCache: ChartConfiguration<'line'>['data'] = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'TPS',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: true,
        borderColor: '#5EEAD4',
        backgroundColor: 'rgba(94,234,212, .2)'
      }
    ]
  };

  // @Input()
  // set data(data) {
  //   this.dataCache = data || {
  //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  //     datasets: [
  //       {
  //         label: 'First Dataset',
  //         data: [65, 59, 80, 81, 56, 55, 40],
  //         fill: false,
  //         borderColor: '#42A5F5',
  //         tension: .4
  //       },
  //       {
  //         label: 'Second Dataset',
  //         data: [28, 48, 40, 19, 86, 27, 90],
  //         fill: false,
  //         borderColor: '#FFA726',
  //         tension: .4
  //       }
  //     ]
  //   };
  // }

  get data() {
    return this.dataCache;
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
