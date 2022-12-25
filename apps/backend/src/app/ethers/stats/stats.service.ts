import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { EtherStats } from "./stats.model";
import {
  ETHERS_REST_API_KEY,
  ETHERS_REST_CONNECTION_URL,
  ETHERS_REST_TIMER_UPDATE
} from "../constants/connection.constants";
import { PubSubService } from "../../utils/pubsub.service";
import { ListenerService } from "../../utils/listener.service";


@Injectable()
export class StatsService extends ListenerService<EtherStats> {
  protected serviceKey = 'etherStats';
  constructor(
    @Inject(ETHERS_REST_TIMER_UPDATE) protected readonly timer: number,
    @Inject(ETHERS_REST_CONNECTION_URL) protected readonly uri: string,
    @Inject(ETHERS_REST_API_KEY) protected readonly key: string,
    protected readonly httpService: HttpService,
    protected readonly pubsub: PubSubService,
  ) {
    super(httpService, pubsub);
    this.observer$(`${uri}?module=stats&action=ethsupply2&apikey=${this.key}`, timer).subscribe();
  }
}
