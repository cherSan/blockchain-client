import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { catchError, combineLatest, delay, map, Observable, of, repeat, retry, switchMap, tap } from "rxjs";
import { GraphQLError } from "graphql/error";
import {
  MINERSTAT_REST_CONNECTION_URL, MINERSTAT_REST_TIMER_UPDATE
} from "../constants/connection.constants";

import { ListenerService } from "../../utils/listener.service";
import { PubSubService } from "../../utils/pubsub.service";

import { CoinHistory } from "./coin-history.model";

import { CoinsService } from "../coins/coins.service";

type CoinsHistory = {
  [coin: string]: {
    [algo: string]: CoinHistory
  }
}
type CoinServerHistory = {
  [timestamp: string]: [string, string, string, string]
}
type ServerAnswer = {
  [coin: string]: CoinServerHistory;
}

@Injectable()
export class CoinHistoryService extends ListenerService<CoinsHistory> {
  protected serviceKey = 'coinHistory';
  constructor(
    @Inject(MINERSTAT_REST_TIMER_UPDATE) protected readonly timer: number,
    @Inject(MINERSTAT_REST_CONNECTION_URL) protected readonly uri: string,
    protected readonly httpService: HttpService,
    protected readonly pubsub: PubSubService,
    private readonly coinService: CoinsService
  ) {
    super(httpService, pubsub);
    // this.observer$(`${uri}/coins-history`, timer).subscribe();
  }

  protected observer$(url: string, timer: number): Observable<CoinsHistory> {
    return this.coinService.coinKeys.pipe(
      switchMap((keys) => {
        if (!keys.length) {
          return of({});
        }
        const updatedAt = Date.now();
        const obs = keys.map((key) => {
          return this.httpService.get<ServerAnswer>(`${url}?coin=${key.coin}&algo=${key.algo}`).pipe(
            map(response => {
              const history: CoinHistory = {
                update_at: updatedAt,
                data: Object.entries(response.data[key.coin])
                  .filter(([timestamp]) => {
                    const ts = (parseInt(timestamp)/3600).toFixed(1);
                    return ts.endsWith('.0')
                  })
                  .map(([timestamp, history]) => {
                    return {
                      timestamp: parseFloat(timestamp) * 1000,
                      network_hashrate: this.parseNumber(history[1]),
                      difficulty: this.parseNumber(history[0]),
                      price: this.parseNumber(history[3]),
                      unknown_field: this.parseNumber(history[2]),
                    }
                  })
              }
              this.pubsub.publish(`${this.serviceKey}_${key.coin}_${key.algo}`, { [this.serviceKey]: history })
              return {
                [key.coin]: {
                  [key.algo]: history
                }
              }
            }),
            catchError((e) => {
              console.error(JSON.stringify(e.error));
              this.error = new GraphQLError('Problem with connection to API: ' + `${key.coin} // ${key.algo}`);
              throw this.error;
            })
          )
        });
        return combineLatest(obs).pipe(
          tap(() => this.error = undefined),
          map(responses => {
            return responses.reduce<CoinsHistory>((accum, response) => {
              return {
                ...accum,
                ...response
              }
            }, {})
          }),
          catchError(async (e) => {
            console.error(e.response.data);
            this.error = new GraphQLError('Problem with connection to API');
            await this.pubsub.publish(this.serviceKey, { error: this.error });
            throw this.error;
          }),
          retry({
            delay: 5000
          }),
          tap(async (data) => this.data = data),
          delay(timer),
          repeat()
        )
      })
    )
  }

  async getCoinHistory(coin: string, algo: string): Promise<CoinHistory> {
    if (this.error) {
      console.error(JSON.stringify(this.error.toJSON()));
      throw this.error;
    }
    return this.data && this.data[coin] ? this.data[coin][algo] : undefined;
  }

  subscribeCoinHistory(coin: string, algo: string): AsyncIterator<CoinHistory> {
    return this.pubsub.subscribe<CoinHistory>(`${this.serviceKey}_${coin}_${algo}`)
  }
  private parseNumber(value: string | number) {
    const parseValue =
      !value ||
      value === 'Inf' ||
      value === 'Infinity' ||
      value === '-1' ||
      value === Infinity ||
      value === -1
        ? 0 : value;
    const numValue = parseFloat(`${parseValue}`);
    return isNaN(numValue) ? 0: numValue;
  }
}
