import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";

import {
  COINCAP_REST_CONNECTION_URL,
  COINCAP_REST_TIMER_UPDATE,
} from "../constants/connection.constants";
import { ETCHistoryInfo } from "./history.model";
import { PubSubService } from "../../utils/pubsub.service";
import { ListenerService } from "../../utils/listener.service";


@Injectable()
export class ETCHistoryService extends ListenerService<ETCHistoryInfo> {
  protected serviceKey = 'etcHistory';
  constructor(
    @Inject(COINCAP_REST_TIMER_UPDATE) protected readonly timer: number,
    @Inject(COINCAP_REST_CONNECTION_URL) protected readonly uri: string,
    protected readonly httpService: HttpService,
    protected readonly pubsub: PubSubService
  ) {
    super(httpService, pubsub);
    this.observer$(`${this.uri}assets/ethereum-classic/history?interval=d1`, timer).subscribe();
  }
}
