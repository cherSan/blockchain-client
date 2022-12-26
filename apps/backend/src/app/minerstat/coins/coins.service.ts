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

type DynamicDataField = {
  [key: string]: number[]
}

@Injectable()
export class CoinsService extends ListenerService<Coins[]> {
  protected serviceKey = 'coins';
  private labels: DynamicDataField = {};
  private difficultyData: DynamicDataField = {};
  private hashrateData: DynamicDataField = {};
  private priceData: DynamicDataField = {};
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
          this.labels[value.coin] = !this.labels[value.coin] ? [value.updated * 1000]: [...this.labels[value.coin], value.updated * 1000];
          if (this.labels[value.coin].length > 1000) this.labels[value.coin].shift();
          this.difficultyData[value.coin] = !this.difficultyData[value.coin] ? [value.difficulty]: [...this.difficultyData[value.coin], value.difficulty]
          if (this.difficultyData[value.coin].length > 1000) this.difficultyData[value.coin].shift();
          this.hashrateData[value.coin] = !this.hashrateData[value.coin] ? [value.network_hashrate]: [...this.hashrateData[value.coin], value.network_hashrate]
          if (this.hashrateData[value.coin].length > 1000) this.hashrateData[value.coin].shift();
          this.priceData[value.coin] = !this.priceData[value.coin] ? [value.price]: [...this.priceData[value.coin], value.price]
          if (this.priceData[value.coin].length > 1000) this.priceData[value.coin].shift();
          const coinDynamicData =  {
            labels: this.labels[value.coin],
            difficultyData: this.difficultyData[value.coin],
            hashrateData: this.hashrateData[value.coin],
            priceData: this.priceData[value.coin],
          };
          pubList.push(
            this.pubsub.publish(value.coin + 'DynamicData' , { coinDynamicData })
          )
        });
        await Promise.all(pubList);
        await this.pubsub.publish(this.serviceKey, { [this.serviceKey]: data })
      }),
      delay(timer),
      repeat()
    );
  }

  public getDynamicData(coin: string): CoinDynamicData {
    return {
      labels: this.labels[coin],
      difficultyData: this.difficultyData[coin],
      hashrateData: this.hashrateData[coin],
      priceData: this.priceData[coin],
    }
  }

  public subscribeDynamicData(coin: string): AsyncIterator<CoinDynamicData> {
    return this.pubsub.subscribe(coin + 'DynamicData')
  }
}
