import { Component, Input, OnInit } from "@angular/core";
import { IListenStatsSubscription, IStatsQuery } from "@blockchain_client/graph-ql-client";

@Component({
  selector: 'main-stats',
  templateUrl: './main-stats.component.html',
  styleUrls: ['./main-stats.component.scss']
})
export class MainStatsComponent {

  @Input()
  stats?: IStatsQuery["stats"] | IListenStatsSubscription["stats"] | null;

}
