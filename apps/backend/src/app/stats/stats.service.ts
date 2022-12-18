import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom, interval, map, switchMap, tap, timeInterval } from "rxjs";
import { PubSub } from "graphql-subscriptions";
import { Stats } from "./stats.model";


@Injectable()
export class StatsService {
  public pubsub = new PubSub();
  constructor(
    private readonly httpService: HttpService
  ) {
    interval(2000).pipe(
      timeInterval(),
      switchMap(() => {
        return this.httpService.get('http://94.19.151.45/api/stats')
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
