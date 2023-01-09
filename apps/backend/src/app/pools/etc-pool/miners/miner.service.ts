import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import {
  catchError,
  combineLatest,
  delay,
  map,
  of,
  repeat,
  retry,
  switchMap,
  tap
} from "rxjs";
import { GraphQLError } from "graphql/error";
import { POOL_REST_CONNECTION_URL, POOL_REST_TIMER_UPDATE } from "../contants/connection.constants";
import { PoolETCMinersService } from "./miners.service";
import { ListenerService } from "../../../utils/listener.service";
import { PubSubService } from "../../../utils/pubsub.service";
import { PoolETCMiner } from "./miner.model";
type MinersMap = {
  [key: string]: PoolETCMiner
}
@Injectable()
export class PoolETCMinerService extends ListenerService<PoolETCMiner[]> {
  protected serviceKey = 'poolEtcMiner';
  private miners: MinersMap = {};
  constructor(
    @Inject(POOL_REST_TIMER_UPDATE) protected readonly timer: number,
    @Inject(POOL_REST_CONNECTION_URL) protected readonly uri: string,
    protected readonly  httpService: HttpService,
    protected readonly pubsub: PubSubService,
    private minersService: PoolETCMinersService
  ) {
    super(httpService, pubsub);
    this.observer$(`${uri}accounts/`, timer).subscribe()
  }
  protected override observer$(uri, timer) {
    return this.minersService.miners.pipe(
      switchMap((miners) => {
        if (!miners.length) {
          return of([])
        }
        const obs = miners.map((id) => {
          return this.httpService.get<PoolETCMiner>(`${uri}${id}`).pipe(
            map(response => response.data),
            tap(async (miner) => {
              this.miners[id] = {
                id,
                ...miner
              };
              await this.pubsub.publish(`${this.serviceKey}_${id}`, { [this.serviceKey]: this.miners[id] })
            })
          )
        });
        return combineLatest(obs)
      }),
      tap(async (data) => {
        this.data = data;
        await this.pubsub.publish(this.serviceKey, { [this.serviceKey]: this.data })
      }),
      catchError((e) => {
        console.error(JSON.stringify(e.error));
        this.error = new GraphQLError('Problem with connection to API');
        throw this.error;
      }),
      retry({
        delay: 5000
      }),
      delay(timer),
      repeat()
    )
  }
  public getMiner(id: string): PoolETCMiner {
    return this.miners[id];
  }
  public subscribeMiner(id: string): AsyncIterator<PoolETCMiner> {
    return this.pubsub.subscribe<PoolETCMiner>(`${this.serviceKey}_${id}`)
  }
}
