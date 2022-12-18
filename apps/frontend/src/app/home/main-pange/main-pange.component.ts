import { Component, OnInit } from '@angular/core';
import { ApolloAngularSDK, IListenStatsSubscription, IStatsQuery } from "@blockchain_client/graph-ql-client";
import { map, Observable, switchMap, tap } from "rxjs";

@Component({
  selector: 'main-pange',
  templateUrl: './main-pange.component.html',
  styleUrls: ['./main-pange.component.scss']
})
export class MainPangeComponent {

  stats$: Observable<undefined | IStatsQuery["stats"] | IListenStatsSubscription["stats"]>;
  constructor(
    private gql: ApolloAngularSDK
  ) {
    this.stats$ = this.gql.stats().pipe(
      map(response => response.data?.stats),
      switchMap(() => this.gql.listenStats()),
      map(response => response.data?.stats),
    );
  }

}
