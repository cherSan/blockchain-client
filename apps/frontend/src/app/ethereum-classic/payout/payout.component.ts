import { Component } from '@angular/core';
import { ColDef } from "ag-grid-community";
import * as moment from "moment/moment";
import { map, of } from "rxjs";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: 'payout',
  templateUrl: './payout.component.html',
  styleUrls: ['./payout.component.css']
})
export class PayoutComponent {
  columnDefs: ColDef[] = [
    {
      maxWidth: 160,
      minWidth: 160,
      headerName: 'Time',
      field: 'timestamp',
      valueFormatter: (data) => moment(data.value).format('L LTS')
    },
    {
      headerName: 'Tx ID',
      field: 'tx'
    },
    {
      maxWidth: 160,
      minWidth: 91200,
      headerName: 'Amount',
      field: 'amount',
      type: 'CoinAmount',
    }
  ]
  userId$ = (this.activeRouter.parent?.params || of({})).pipe(
    map((data) => data["id"])
  )
  constructor(
    private activeRouter: ActivatedRoute,
  ) {

  }
}
