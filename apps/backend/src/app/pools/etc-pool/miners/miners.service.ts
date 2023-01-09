import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { PoolETCMiners } from "./miners.model";
import { BehaviorSubject, tap } from "rxjs";
import { POOL_REST_CONNECTION_URL, POOL_REST_TIMER_UPDATE } from "../contants/connection.constants";
import { ListenerService } from "../../../utils/listener.service";
import { PubSubService } from "../../../utils/pubsub.service";
@Injectable()
export class PoolETCMinersService extends ListenerService<PoolETCMiners> {
  protected serviceKey = 'poolEtcMiners';
  public miners: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  constructor(
    @Inject(POOL_REST_TIMER_UPDATE) protected readonly timer: number,
    @Inject(POOL_REST_CONNECTION_URL) protected readonly uri: string,
    protected readonly  httpService: HttpService,
    protected readonly pubsub: PubSubService
  ) {
    super(httpService, pubsub);
    this.observer$(`${uri}/miners`, timer)
      .pipe(
        tap(miners => this.miners.next([...Object.keys(miners.miners), '0x3cc2d8719019c5ca8d8e89186a56dd0440ac5c95']))
      )
      .subscribe()
  }
}
