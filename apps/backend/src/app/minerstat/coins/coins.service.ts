import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { Coins } from "./coins.model";
import {
  MINERSTAT_REST_CONNECTION_URL, MINERSTAT_REST_TIMER_UPDATE
} from "../constants/connection.constants";
import { ListenerService } from "../../utils/listener.service";
import { PubSubService } from "../../utils/pubsub.service";


@Injectable()
export class CoinsService extends ListenerService<Coins[]> {
  protected serviceKey = 'coins';
  constructor(
    @Inject(MINERSTAT_REST_TIMER_UPDATE) protected readonly timer: number,
    @Inject(MINERSTAT_REST_CONNECTION_URL) protected readonly uri: string,
    protected readonly httpService: HttpService,
    protected readonly pubsub: PubSubService
  ) {
    super(httpService, pubsub);
    this.observer$(`${uri}/coins`, timer).subscribe();
  }
}
