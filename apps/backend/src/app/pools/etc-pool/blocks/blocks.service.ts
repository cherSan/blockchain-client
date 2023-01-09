import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { PoolETCBlocks } from "./blocks.model";
import { POOL_REST_CONNECTION_URL, POOL_REST_TIMER_UPDATE } from "../contants/connection.constants";
import { ListenerService } from "../../../utils/listener.service";
import { PubSubService } from "../../../utils/pubsub.service";
@Injectable()
export class PoolETCBlocksService extends ListenerService<PoolETCBlocks> {
  protected serviceKey = 'poolEtcBlocks';
  constructor(
    @Inject(POOL_REST_TIMER_UPDATE) protected readonly timer: number,
    @Inject(POOL_REST_CONNECTION_URL) protected readonly uri: string,
    protected readonly  httpService: HttpService,
    protected readonly pubsub: PubSubService
  ) {
    super(httpService, pubsub);
    this.observer$(`${uri}/blocks`, timer)
      .subscribe()
  }
}
