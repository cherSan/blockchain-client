import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { Coins } from "./coins.model";
import {
  MINERSTAT_REST_CONNECTION_URL, MINERSTAT_REST_TIMER_UPDATE
} from "../constants/connection.constants";
import { ListenerService } from "../../utils/listener.service";
import { PubSubService } from "../../utils/pubsub.service";
import { catchError, delay, map, Observable, repeat, retry, tap } from "rxjs";
import { GraphQLError } from "graphql/error";
import { CoinDynamicData } from "./dynamic-data.model";

interface DynamicData {
  difficultyData: number;
  hashrateData: number;
  priceData: number;
}
interface UpdateList {
  [updateTimestamp: number]: DynamicData
}

interface CoinsDynamicData {
  [coinSymbol: string]: UpdateList
}

@Injectable()
export class CoinsService extends ListenerService<Coins[]> {
  protected serviceKey = 'coins';
  private coinDynamicData: CoinsDynamicData = {};
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
        this.data = data;
        const pubList: Promise<unknown>[] = [];
        data.forEach((value) => {
          const timestamp = value.updated * 1000;
          this.coinDynamicData[value.coin] = {
            ...(this.coinDynamicData[value.coin] || {}),
          }
          if (!this.coinDynamicData[value.coin][timestamp]) {
            const timestamps = Object.keys(this.coinDynamicData[value.coin]);
            if (timestamps.length > 99) {
              delete this.coinDynamicData[value.coin][timestamps[0]];
            }
            this.coinDynamicData[value.coin][timestamp] = {
              difficultyData: value.difficulty,
              hashrateData: value.network_hashrate,
              priceData: value.price,
            }
            const coinDynamicData = Object.entries(this.coinDynamicData[value.coin])
              .reduce<CoinDynamicData>((accum, [label, data]) => {
                accum.labels.push(parseInt(label));
                accum.difficultyData.push(data.difficultyData);
                accum.hashrateData.push(data.hashrateData);
                accum.priceData.push(data.priceData);
                return accum;
              }, {
                labels: [],
                difficultyData: [],
                hashrateData: [],
                priceData: []
              });
            pubList.push(
              this.pubsub.publish(value.coin + 'DynamicData' , { coinDynamicData })
            )
          }
        });
        await Promise.all(pubList);
        await this.pubsub.publish(this.serviceKey, { [this.serviceKey]: data })
      }),
      delay(timer),
      repeat()
    );
  }

  public getDynamicData(coin: string): CoinDynamicData {
    return  Object.entries(this.coinDynamicData[coin] || {})
      .reduce<CoinDynamicData>((accum, [label, data]) => {
        accum.labels.push(parseInt(label));
        accum.difficultyData.push(data.difficultyData);
        accum.hashrateData.push(data.hashrateData);
        accum.priceData.push(data.priceData);
        return accum;
      }, {
        labels: [],
        difficultyData: [],
        hashrateData: [],
        priceData: []
      });
  }

  public subscribeDynamicData(coin: string): AsyncIterator<CoinDynamicData> {
    return this.pubsub.subscribe(coin + 'DynamicData')
  }
}
