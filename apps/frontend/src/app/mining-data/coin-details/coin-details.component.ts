import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs";
import { CmMetricsLoaderType, IMetrics } from "@blockchain_client/graph-ql-client";
@Component({
  selector: 'coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.scss']
})
export class CoinDetailsComponent {
  coin$ = this.activeRoute.params.pipe(map((v) => v['coin']));
  metricsData?: CmMetricsLoaderType | null;
  metrics = IMetrics;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
  }
}
