import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { RatesInfo } from "./rate.model";
import {
  COINCAP_REST_CONNECTION_URL,
  COINCAP_REST_TIMER_UPDATE,
} from "../constants/connection.constants";
import { ListenerService } from "../../utils/listener.service";
import { PubSubService } from "../../utils/pubsub.service";


@Injectable()
export class RateService extends ListenerService<RatesInfo> {
  protected serviceKey = 'rates';
  constructor(
    @Inject(COINCAP_REST_TIMER_UPDATE) protected readonly timer: number,
    @Inject(COINCAP_REST_CONNECTION_URL) protected readonly uri: string,
    protected readonly httpService: HttpService,
    protected readonly pubsub: PubSubService
  ) {
    super(httpService, pubsub);
    this.observer$(`${uri}rates`, timer).subscribe();
  }
}
