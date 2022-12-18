import { Component, OnInit } from '@angular/core';
import { ApolloAngularSDK, IListenStatsSubscription, IStatsQuery } from "@blockchain_client/graph-ql-client";
import { map, Observable, switchMap, tap } from "rxjs";

@Component({
  selector: 'main-pange',
  templateUrl: './main-pange.component.html',
  styleUrls: ['./main-pange.component.scss']
})
export class MainPangeComponent implements OnInit {

  stats?: IStatsQuery["stats"] | IListenStatsSubscription["stats"];
  constructor(
    private gql: ApolloAngularSDK
  ) {

  }

  ngOnInit(): void {
    this.gql.stats().pipe(
      map(response => response.data?.stats),
      tap(value => this.stats = value),
      switchMap(() => this.gql.listenStats()),
      map(response => response.data?.stats),
      tap(value => this.stats = value),
    ).subscribe()
  }

}
