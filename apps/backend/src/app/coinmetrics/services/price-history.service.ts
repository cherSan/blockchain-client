import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { GraphQLError } from "graphql/error";
import { catchError, delay, map, Observable, repeat, retry, tap } from "rxjs";
import { COINMETRICS_REST_CONNECTION_URL } from "../constants/connection.constants";
import { AssetList, Assets, Metrics, MetricsHistoryList, MetricsPriceList } from "../constants/assets.constants";
import { CMAssetsPriceHistory } from "../models/price-history.model";
import { ListenerService } from "../../utils/listener.service";
import { PubSubService } from "../../utils/pubsub.service";
import { CMAssetsLastPrice } from "../models/last-price.model";
@Injectable()
export class CMPriceHistoryService extends ListenerService<CMAssetsPriceHistory> {
  protected serviceKey = 'cmAssetsPriceHistory';
  protected lastPriceServiceKey = 'cmAssetsLastPrice';
  protected lastPriceValue: CMAssetsLastPrice;
  set lastPrice(data: CMAssetsLastPrice) {
    this.lastPriceValue = data
  }
  get lastPrice(): CMAssetsLastPrice {
    return this.lastPriceValue;
  }
  constructor(
    @Inject(COINMETRICS_REST_CONNECTION_URL) protected readonly uri: string,
    protected readonly httpService: HttpService,
    protected readonly pubsub: PubSubService
  ) {
    super(httpService, pubsub);
    const assets = AssetList.join(',');
    const metrics = MetricsPriceList.join(',');
    const limit_per_asset = 60*5;
    const page_size = AssetList.length * limit_per_asset;
    const url = `${uri}timeseries/asset-metrics?assets=${assets}&metrics=${metrics}&page_size=${page_size}&limit_per_asset=${limit_per_asset}&frequency=1m`;
    this.observer$(url, 1000*60)
      .subscribe();
  }
  protected override observer$(url: string, timer: number): Observable<CMAssetsPriceHistory> {
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
          accum.lastPrice[asset] = accum.lastPrice[asset] && accum.lastPrice[asset].time > value.time
            ? accum.lastPrice[asset] : value;
          return accum;
        }, {
          data: {},
          lastPrice: {}
        });
        this.data = tmpData.data;
        this.lastPrice = tmpData.lastPrice;
        await this.pubsub.publish(this.serviceKey, { [this.serviceKey]: this.data })
        await this.pubsub.publish(this.lastPriceServiceKey, { [this.lastPriceServiceKey]: this.lastPrice })
      }),
      delay(timer),
      repeat()
    );
  }
  async getLastPrice(): Promise<CMAssetsLastPrice> {
    if (this.error) {
      throw this.error;
    }
    return this.lastPrice;
  }
  subscribeLastPrice(): AsyncIterator<CMAssetsLastPrice> {
    return this.pubsub.subscribe<CMAssetsLastPrice>(this.lastPriceServiceKey)
  }
}
