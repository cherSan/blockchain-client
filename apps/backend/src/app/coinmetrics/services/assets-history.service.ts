import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { GraphQLError } from "graphql/error";
import { catchError, delay, map, Observable, repeat, retry, tap } from "rxjs";
import { COINMETRICS_REST_CONNECTION_URL } from "../constants/connection.constants";
import { AssetList, MetricsHistoryList } from "../constants/assets.constants";
import { CMAssetsHistory } from "../models/assets-history.model";
import { ListenerService } from "../../utils/listener.service";
import { PubSubService } from "../../utils/pubsub.service";
@Injectable()
export class CMAssetsHistoryService extends ListenerService<CMAssetsHistory> {
  protected serviceKey = 'cmAssetsData';
  constructor(
    @Inject(COINMETRICS_REST_CONNECTION_URL) protected readonly uri: string,
    protected readonly httpService: HttpService,
    protected readonly pubsub: PubSubService
  ) {
    super(httpService, pubsub);
    const assets = AssetList.join(',');
    const metrics = MetricsHistoryList.join(',');
    const limit_per_asset = 365;
    const page_size = AssetList.length * limit_per_asset;
    const url = `${uri}timeseries/asset-metrics?assets=${assets}&metrics=${metrics}&page_size=${page_size}&limit_per_asset=${limit_per_asset}&frequency=1d`;
    this.observer$(url, 1000*60*60*12)
      .subscribe();
  }
  protected override observer$(url: string, timer: number): Observable<CMAssetsHistory> {
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
        this.data = data.reduce((accum, value) => {
          accum[value.asset.toUpperCase()] = [...(accum[value.asset?.toUpperCase()] || []), value]
          return accum;
        }, {});
        await this.pubsub.publish(this.serviceKey, { [this.serviceKey]: this.data })
      }),
      delay(timer),
      repeat()
    );
  }
}
