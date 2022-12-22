import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom, interval, map, switchMap, tap, timeInterval } from "rxjs";
import { PubSub } from "graphql-subscriptions";
import { Stats } from "./stats.model";
import { LAKE_TIMER } from "../injection/lake-timer.injection";
import { LAKE_URI } from "../injection/lake-url.injection";


@Injectable()
export class StatsService {
  public pubsub = new PubSub();
  constructor(
    @Inject(LAKE_TIMER) private readonly timer: number,
    @Inject(LAKE_URI) private readonly uri: string,
    private readonly httpService: HttpService
  ) {
    interval(this.timer).pipe(
      timeInterval(),
      switchMap(() => {
        return this.httpService.get(this.uri)
      }),
      map(response => {
        return response.data
      }),
      tap((stats) => {
        this.pubsub.publish('stats', { stats })
      })
    ).subscribe()
  }
  async get(): Promise<Stats> {
    return await firstValueFrom(this.httpService.get('http://94.19.151.45/api/stats')
      .pipe(
        map(response => {
          return response.data
        }),
        tap((stats) => {
          this.pubsub.publish('stats', { stats })
        })
      ));
  }
}
