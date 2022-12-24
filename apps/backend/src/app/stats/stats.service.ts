import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { Stats } from "./stats.model";
import { LAKE_TIMER } from "../injection/lake-timer.injection";
import { LAKE_URI } from "../injection/lake-url.injection";
import { ListenerService } from "../utils/listener.service";
import { PubSubService } from "../utils/pubsub.service";


@Injectable()
export class StatsService extends ListenerService<Stats> {
  protected serviceKey = 'stats';

  constructor(
    @Inject(LAKE_TIMER) protected readonly timer: number,
    @Inject(LAKE_URI) protected readonly uri: string,
    protected readonly  httpService: HttpService,
    protected readonly pubsub: PubSubService
  ) {
    super(timer, uri, httpService, pubsub);
    this.observer$.subscribe()
  }
}
