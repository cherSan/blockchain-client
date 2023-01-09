import { Component } from '@angular/core';
import { IAssets, IMetrics } from "@blockchain_client/graph-ql-client";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'mining-data',
  templateUrl: './mining-data.component.html',
  styleUrls: ['./mining-data.component.scss']
})
export class MiningDataComponent {
  metrics = IMetrics;
  assets = IAssets;
  relative = this.activeRoute
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }
}
