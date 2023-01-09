import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { NewsData } from "./newsdata.model";
import {
  NEWSDATA_REST_API_KEY,
  NEWSDATA_REST_TIMER_UPDATE,
  NEWSDATA_REST_CONNECTION_URL
} from "../constants/connection.constants";
import { GraphQLError } from "graphql/error";
import { catchError, combineLatest, delay, map, Observable, repeat, retry, tap } from "rxjs";
import * as https from "https";

import { PubSubService } from "../../utils/pubsub.service";
import { ListenerService } from "../../utils/listener.service";


@Injectable()
export class NewsdataService extends ListenerService<NewsData> {
  protected serviceKey = 'newsData';
  constructor(
    @Inject(NEWSDATA_REST_TIMER_UPDATE) protected readonly timer: number,
    @Inject(NEWSDATA_REST_CONNECTION_URL) protected readonly uri: string,
    @Inject(NEWSDATA_REST_API_KEY) protected readonly key: string,
    protected readonly httpService: HttpService,
    protected readonly pubsub: PubSubService
  ) {
    super(httpService, pubsub);
    this.observer$(`${this.uri}&apikey=${this.key}`, timer).subscribe();
  }

  protected observer$(url, timer): Observable<NewsData> {
    const options = {
      httpsAgent: new https.Agent({ rejectUnauthorized: false })
    }
    return combineLatest([
      this.httpService.get(url, options),
      this.httpService.get(`${url}&page=1`, options)
    ]).pipe(
      tap(() => this.error = undefined),
      map(([response1, response2]) => {
        if (response1.data.status !== 'success') {
          throw new Error('Problem with connection to API')
        }
        return {
          data: [...response1?.data?.results, ...(response2.data?.results || [])],
          update_at: Date.now()
        };
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
      tap(async (data) => {
        this.data = data;
        await this.pubsub.publish(this.serviceKey, { [this.serviceKey]: data })
      }),
      delay(timer),
      repeat()
    );
  }
}
