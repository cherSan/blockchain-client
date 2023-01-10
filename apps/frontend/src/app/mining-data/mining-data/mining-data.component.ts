import { Component } from '@angular/core';
import { IAssets } from "@blockchain_client/graph-ql-client";
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'mining-data',
  templateUrl: './mining-data.component.html',
  styleUrls: ['./mining-data.component.scss']
})
export class MiningDataComponent {
  assetsList = [
    IAssets.Etc,
    IAssets.Btc,
    IAssets.Eth,
    IAssets.Dash,
    IAssets.Doge,
    IAssets.Bch,
    IAssets.Bsv,
    IAssets.Ltc
  ];
  relative = this.activeRoute
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }
}
