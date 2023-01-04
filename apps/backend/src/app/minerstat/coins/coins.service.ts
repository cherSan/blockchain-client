import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { BehaviorSubject, catchError, delay, map, Observable, repeat, retry, tap } from "rxjs";
import { GraphQLError } from "graphql/error";

import { Coins } from "./coins.model";
import {
  MINERSTAT_REST_CONNECTION_URL, MINERSTAT_REST_TIMER_UPDATE
} from "../constants/connection.constants";
import { ListenerService } from "../../utils/listener.service";
import { PubSubService } from "../../utils/pubsub.service";

type CoinKeys = {
  coin: string,
  algo: string
}

@Injectable()
export class CoinsService extends ListenerService<Coins[]> {
  protected serviceKey = 'coins';
  public coinKeys: BehaviorSubject<CoinKeys[]> = new BehaviorSubject<CoinKeys[]>([]);
  constructor(
    @Inject(MINERSTAT_REST_TIMER_UPDATE) protected readonly timer: number,
    @Inject(MINERSTAT_REST_CONNECTION_URL) protected readonly uri: string,
    protected readonly httpService: HttpService,
    protected readonly pubsub: PubSubService
  ) {
    super(httpService, pubsub);
    this.observer$(`${uri}/coins`, timer).subscribe();
  }

  protected observer$(url: string, timer: number): Observable<Coins[]> {
    return this.httpService.get(url).pipe(
      tap(() => this.error = undefined),
      map(response => response?.data),
      catchError(async (_) => {
        this.error = new GraphQLError('Problem with connection to API');
        await this.pubsub.publish(this.serviceKey, { error: this.error });
        throw this.error;
      }),
      retry(),
      tap(async (data) => {
        this.data = data.filter((v) =>
          v.network_hashrate !== -1 &&
          v.network_hashrate !== Infinity &&
          v.difficulty !== -1 &&
          v.difficulty !== Infinity &&
          v.price !== -1 &&
          v.price !== 0 &&
          v.price !== Infinity
        );
        const coinKeys = this.data.map(v => ({
          coin: v.coin,
          algo: v.algorithm
        }));
        if (JSON.stringify(coinKeys) !== JSON.stringify(this.coinKeys.getValue())) {
          this.coinKeys.next(coinKeys);
        }
        await this.pubsub.publish(this.serviceKey, { [this.serviceKey]: this.data })
      }),
      delay(timer),
      repeat()
    );
  }
}
