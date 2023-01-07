import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { RowClickedEvent } from "ag-grid-community";
@Component({
  selector: 'coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.scss']
})
export class CoinDetailsComponent {
  public symbol$: Observable<string | null | undefined> = this.activeRoute.params.pipe(
    map(params => params['id'])
  )
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
  }
  onRowClick($event: RowClickedEvent<any>) {
    return this.router.navigate([$event.data?.symbol], {relativeTo: this.activeRoute.parent})
  }
}
