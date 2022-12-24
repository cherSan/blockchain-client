import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { EtherStats } from "./stats.model";
import { EthersListenerService } from "../utils/ethers-listener.service";
import {
  ETHERS_REST_API_KEY,
  ETHERS_REST_CONNECTION_URL,
  ETHERS_REST_TIMER_UPDATE
} from "../constants/connection.constants";
import { PubSubService } from "../../utils/pubsub.service";


@Injectable()
export class StatsService extends EthersListenerService<EtherStats> {
  protected serviceKey = 'etherStats';
  protected module = 'stats';
  protected action = 'ethsupply2'

  constructor(
    @Inject(ETHERS_REST_TIMER_UPDATE) protected readonly timer: number,
    @Inject(ETHERS_REST_CONNECTION_URL) protected readonly uri: string,
    @Inject(ETHERS_REST_API_KEY) protected readonly key: string,
    protected readonly httpService: HttpService,
    protected readonly pubsub: PubSubService,
  ) {
    super(timer, uri, key, httpService, pubsub);
    this.observer$.subscribe();
  }
}
