import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { map, tap } from "rxjs";

@Component({
  selector: 'miner-detail',
  templateUrl: './miner-detail.component.html',
  styleUrls: ['./miner-detail.component.css']
})
export class MinerDetailComponent implements OnInit {
  userId$ = this.activeRouter.params.pipe(
    tap((data) => console.log(5, data)),
    map((data) => data["id"])
  )
  constructor(
    private activeRouter: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
  }

}
