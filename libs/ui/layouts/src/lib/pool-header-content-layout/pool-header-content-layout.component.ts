import { Component, Input, OnInit } from "@angular/core";
import { IListenMinerstatsCoinsQuery, IMinerstatsCoinsQuery } from "@blockchain_client/graph-ql-client";

type Coin = IMinerstatsCoinsQuery["coins"][number] | IListenMinerstatsCoinsQuery["coins"][number];
@Component({
  selector: 'pool-header-content-layout',
  templateUrl: './pool-header-content-layout.component.html',
  styleUrls: ['./pool-header-content-layout.component.scss']
})
export class PoolHeaderContentLayoutComponent implements OnInit {

  @Input()
  error = undefined;

  @Input()
  coin: undefined | Coin = undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
