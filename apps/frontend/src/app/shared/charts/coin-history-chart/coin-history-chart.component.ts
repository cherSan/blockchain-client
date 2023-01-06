import { Component, Input } from "@angular/core";
import { AgChartOptions } from "ag-charts-community";
@Component({
  selector: 'coin-history-chart',
  templateUrl: './coin-history-chart.component.html',
  styleUrls: ['./coin-history-chart.component.scss']
})
export class CoinHistoryChartComponent {
  public options: AgChartOptions = {};
  @Input()
  public title!: string;
  @Input()
  public fields = {
    network_hashrate: true,
    difficulty: true,
    price: true
  }
  @Input()
  public coin?: string;
  @Input()
  public algo?: string;
}
