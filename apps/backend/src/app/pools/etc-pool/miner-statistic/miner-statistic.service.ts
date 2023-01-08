import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  delay,
  map,
  Observable, of,
  repeat,
  retry,
  switchMap,
  tap
} from "rxjs";
import { GraphQLError } from "graphql/error";
import { MinerStat } from "./miner-statistic.model";
import { ListenerService } from "../../../utils/listener.service";
import { PubSubService } from "../../../utils/pubsub.service";
import { POOL_REST_CONNECTION_URL, POOL_REST_TIMER_UPDATE } from "../contants/connection.constants";
import { MinerListService } from "../miners/miner-list.service";

type MinerStats = {
  [key: string]: MinerStat
}
@Injectable()
export class MinerStatisticService extends ListenerService<MinerStats> {
  protected serviceKey = 'etcMinerData';
  private minersMap: BehaviorSubject<MinerStats> = new BehaviorSubject<MinerStats>({});
  constructor(
    @Inject(POOL_REST_TIMER_UPDATE) protected readonly timer: number,
    @Inject(POOL_REST_CONNECTION_URL) protected readonly uri: string,
    protected readonly  httpService: HttpService,
    protected readonly pubsub: PubSubService,
    private minerList: MinerListService
  ) {
    super(httpService, pubsub);
    this.observer$(`${uri}accounts/`, timer).subscribe()
  }

  protected observer$(uri, timer): Observable<MinerStats> {
    return this.minerList.miners.pipe(
      switchMap((miners) => {
        if (!miners.length) {
          return of({})
        }
        const obs = miners.map((id) => {
          return this.httpService.get<MinerStat>(`${uri}${id}`).pipe(
            map(response => {
              return {
                ...response.data,
                id
              }
            }),
            tap((stat) => {
              this.pubsub.publish(`${this.serviceKey}_${id}`, { [this.serviceKey]: stat })
            }),
            catchError((e) => {
              console.error(JSON.stringify(e.error));
              this.error = new GraphQLError('Problem with connection to API: ' + `${id}`);
              throw this.error;
            })
          )
        });

        return combineLatest(obs).pipe(
          tap(() => this.error = undefined),
          map(data => {
            return  data.reduce((accum, data) => {
              accum[data.id] = data;
              return accum;
            }, {});
          }),
          tap((data) => this.minersMap.next(data)),
          catchError(async (e) => {
            console.error(e.response.data);
            this.error = new GraphQLError('Problem with connection to API');
            await this.pubsub.publish(this.serviceKey, { error: this.error });
            throw this.error;
          }),
          retry({
            delay: 5000
          }),
          delay(timer),
          repeat()
        )
      })
    )
  }

  async getMainerStat(id: string): Promise<MinerStat> {
    return this.minersMap.getValue()[id];
  }

  subscribeMinerStat(id: string): AsyncIterator<MinerStat> {
    return this.pubsub.subscribe<MinerStat>(`${this.serviceKey}_${id}`)
  }
}
