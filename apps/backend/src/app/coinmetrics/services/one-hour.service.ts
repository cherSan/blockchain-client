import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { GraphQLError } from "graphql/error";
import { catchError, delay, map, Observable, repeat, retry, tap } from "rxjs";
import { COINMETRICS_REST_CONNECTION_URL } from "../constants/connection.constants";
import { AssetList, Assets, Metrics } from "../constants/assets.constants";
import { CmOneHour } from "../models/one-hour.model";
import { ListenerService } from "../../utils/listener.service";
import { PubSubService } from "../../utils/pubsub.service";
import { CmLast } from "../models/last-data.model";
@Injectable()
export class CMOneHourService extends ListenerService<CmOneHour> {
  protected serviceKey = 'cmOneHour';
  protected lastStateServiceKey = 'cmLast';
  protected lastStateValue: CmLast;
  set lastState(data: CmLast) {
    this.lastStateValue = data
  }
  get lastState(): CmLast {
    return this.lastStateValue;
  }
  constructor(
    @Inject(COINMETRICS_REST_CONNECTION_URL) protected readonly uri: string,
    protected readonly httpService: HttpService,
    protected readonly pubsub: PubSubService
  ) {
    super(httpService, pubsub);
    const assets = AssetList.map(v => Assets[v]).join(',');
    const limit_per_asset = 360;
    const page_size = AssetList.length * limit_per_asset;
    const url = `${uri}timeseries/asset-metrics?assets=${assets}&metrics=ReferenceRate&page_size=${page_size}&limit_per_asset=${limit_per_asset}&frequency=1m`;
    this.observer$(url, 1000*60)
      .subscribe();
  }
  protected override observer$(url: string, timer: number): Observable<CmOneHour> {
    return this.httpService.get(url).pipe(
      tap(() => this.error = undefined),
      map(response => response?.data),
      catchError(async (e) => {
        console.error(e.response.data);
        this.error = new GraphQLError('Problem with connection to API');
        await this.pubsub.publish(this.serviceKey, { error: this.error });
        throw this.error;
      }),
      retry({
        delay: 5000
      }),
      tap(async ({ data }) => {
        const tmpData = data.reduce((accum, value) => {
          const asset = value.asset.toUpperCase();
          accum.data[asset] = [...(accum.data[asset] || []), value]
          accum.lastState[asset] = accum.lastState[asset] && accum.lastState[asset].time > value.time
            ? accum.lastState[asset] : value;
          return accum;
        }, {
          data: {},
          lastState: {}
        });
        this.data = tmpData.data;
        this.lastState = tmpData.lastState;
        await this.pubsub.publish(this.serviceKey, { [this.serviceKey]: this.data })
        await this.pubsub.publish(this.lastStateServiceKey, { [this.lastStateServiceKey]: this.lastState })
      }),
      delay(timer),
      repeat()
    );
  }
  async getLastState(): Promise<CmLast> {
    if (this.error) {
      throw this.error;
    }
    return this.lastState;
  }
  subscribeLastState(): AsyncIterator<CmLast> {
    return this.pubsub.subscribe<CmLast>(this.lastStateServiceKey)
  }
}
