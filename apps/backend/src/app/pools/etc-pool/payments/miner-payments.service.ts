import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ListenerService } from "../../../utils/listener.service";
import { PubSubService } from "../../../utils/pubsub.service";
import { POOL_REST_CONNECTION_URL, POOL_REST_TIMER_UPDATE } from "../contants/connection.constants";
import { MinerPayments } from "./miner-payments.model";
@Injectable()
export class MinerPaymentsService extends ListenerService<MinerPayments> {
  protected serviceKey = 'etcMinersPaymentsData';
  constructor(
    @Inject(POOL_REST_TIMER_UPDATE) protected readonly timer: number,
    @Inject(POOL_REST_CONNECTION_URL) protected readonly uri: string,
    protected readonly  httpService: HttpService,
    protected readonly pubsub: PubSubService,
  ) {
    super(httpService, pubsub);
    this.observer$(`${uri}payments`, timer).subscribe()
  }
}
