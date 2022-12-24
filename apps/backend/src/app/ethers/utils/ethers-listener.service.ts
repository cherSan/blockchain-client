import { HttpService } from "@nestjs/axios";
import { catchError, interval, map, retry, switchMap, tap, timeInterval } from "rxjs";
import { GraphQLError } from "graphql/error";
import { ListenerService } from "../../utils/listener.service";
import { PubSubService } from "../../utils/pubsub.service";

export class EthersListenerService<T> extends ListenerService<T> {

  protected serviceKey: string;
  protected module: string;
  protected action: string;
  protected observer$ = interval(this.timer).pipe(
    timeInterval(),
    switchMap(() => this.httpService.get(`${this.uri}?module=${this.module}&action=${this.action}&apikey=${this.key}`)),
    tap(() => this.error = undefined),
    map(response => response?.data),
    map(data => {
      if (data?.status !== '1') {
        throw new Error('Error API connect')
      }
      return data?.result;
    }),
    catchError(async (_) => {
      this.error = new GraphQLError('Problem with connection to API');
      await this.pubsub.publish(this.serviceKey, { error: this.error });
      throw this.error;
    }),
    retry(),
    tap(async (data) => {
      this.data = data;
      await this.pubsub.publish(this.serviceKey, { [this.serviceKey]: data })
    })
  );

  constructor(
    protected readonly timer: number,
    protected readonly uri: string,
    protected readonly key: string,
    protected readonly httpService: HttpService,
    protected readonly pubsub: PubSubService,
  ) {
    super(timer, uri, httpService, pubsub);
  }
}
