import { Component } from '@angular/core';
import { map } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'miner',
  templateUrl: './miner.component.html',
  styleUrls: ['./miner.component.css']
})
export class MinerComponent {
  userId$ = this.activeRouter.params.pipe(
    map((data) => data["id"])
  )

  public readonly relativeTo = this.activeRouter;
  constructor(
    private activeRouter: ActivatedRoute,
  ) {}
}
