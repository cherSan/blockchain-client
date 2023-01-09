import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { catchError, delay, map, Observable, repeat, retry, tap } from "rxjs";
import { GraphQLError } from "graphql/error";
import {
  COINMETRICS_REST_CONNECTION_URL
} from "../constants/connection.constants";
import { ListenerService } from "../../utils/listener.service";
import { PubSubService } from "../../utils/pubsub.service";
import { Metrics } from "../constants/assets.constants";
import { CMMetrics } from "../models/metrics.model";
@Injectable()
export class CMMetricsService extends ListenerService<CMMetrics> {
  protected serviceKey = 'rates';
  constructor(
    @Inject(COINMETRICS_REST_CONNECTION_URL) protected readonly uri: string,
    protected readonly httpService: HttpService,
    protected readonly pubsub: PubSubService
  ) {
    super(httpService, pubsub);
    const url = `${uri}catalog/asset-metrics?metrics=${Object.values(Metrics).join(',')}`;
    this.observer$(url, 1000*60*60*12)
      .subscribe();
  }
  protected override observer$(url: string, timer: number): Observable<CMMetrics> {
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
        this.data = {
          list: Object.values(Metrics),
          data
        };
        await this.pubsub.publish(this.serviceKey, { [this.serviceKey]: this.data })
      }),
      delay(timer),
      repeat()
    );
  }
}
