import { Component } from '@angular/core';
import { IAssets } from "@blockchain_client/graph-ql-client";

@Component({
  selector: 'market-data',
  templateUrl: './market-data.component.html',
  styleUrls: ['./market-data.component.scss']
})
export class MarketDataComponent {
  assets = IAssets;
}
