import { Component } from '@angular/core';
import { CmMetricsLoaderType, IMetrics } from "@blockchain_client/graph-ql-client";
@Component({
  selector: 'pool',
  templateUrl: './pool.component.html',
  styleUrls: ['./pool.component.scss']
})
export class PoolComponent {
  metricsData?: CmMetricsLoaderType | null;
  metrics = IMetrics;
}
