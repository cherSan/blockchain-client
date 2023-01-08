import { Component, Input } from "@angular/core";
import { IAssets } from "@blockchain_client/graph-ql-client";
@Component({
  selector: 'prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent {
  @Input()
  asset?: IAssets;
}
