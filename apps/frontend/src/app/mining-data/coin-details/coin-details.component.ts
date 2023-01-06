import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { map, Observable } from "rxjs";

@Component({
  selector: 'coin-details',
  templateUrl: './coin-details.component.html',
  styleUrls: ['./coin-details.component.scss']
})
export class CoinDetailsComponent {
  public params$: Observable<{coin?: string, algo?: string}> = this.activeRoute.params.pipe(
    map((params) => {
      const coin = params['coin'];
      const algo = params['algo'];
      if (!coin || !algo) {
        return {};
      }
      return {coin, algo}
    })
  );
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
  }
}
