import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";
@Component({
  selector: 'miner-detail',
  templateUrl: './miner-detail.component.html',
  styleUrls: ['./miner-detail.component.css']
})
export class MinerDetailComponent {
  userId$ = this.activeRouter.params.pipe(
    map((data) => data["id"])
  )

  public readonly relativeTo = this.activeRouter;
  constructor(
    private activeRouter: ActivatedRoute,
  ) {}
}
