import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { GraphQLError } from "graphql/error";
import { catchError, interval, map, retry, switchMap, tap, timeInterval } from "rxjs";

import {
  COINCAP_REST_CONNECTION_URL,
  COINCAP_REST_TIMER_UPDATE,
} from "../constants/connection.constants";
import { HistoryInfo } from "./history.model";
import { PubSubService } from "../../utils/pubsub.service";
import { ListenerService } from "../../utils/listener.service";


@Injectable()
export class HistoryService extends ListenerService<HistoryInfo> {
  protected serviceKey = 'history';

  protected observer$ = interval(this.timer).pipe(
    timeInterval(),
    switchMap(() => this.httpService.get(`${this.uri}assets/ethereum-classic/history?interval=d1`)),
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
      await this.pubsub.publish(this.serviceKey, { [this.serviceKey]: data })
    })
  );

  constructor(
    @Inject(COINCAP_REST_TIMER_UPDATE) protected readonly timer: number,
    @Inject(COINCAP_REST_CONNECTION_URL) protected readonly uri: string,
    protected readonly httpService: HttpService,
    protected readonly pubsub: PubSubService
  ) {
    super(timer, uri, httpService, pubsub);
    this.observer$.subscribe();
  }
}
