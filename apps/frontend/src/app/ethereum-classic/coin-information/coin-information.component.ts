import { Component } from '@angular/core';
import { CmMetricsLoaderType, IMetrics } from "@blockchain_client/graph-ql-client";

@Component({
  selector: 'coin-information',
  templateUrl: './coin-information.component.html',
  styleUrls: ['./coin-information.component.css']
})
export class CoinInformationComponent {
  metricsData?: CmMetricsLoaderType | null;
  metrics = IMetrics;
}
