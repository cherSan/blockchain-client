import { HttpService } from "@nestjs/axios";
import { catchError, delay, map, repeat, retry, tap } from "rxjs";
import { GraphQLError } from "graphql/error";
import { ListenerService } from "../../utils/listener.service";
import { PubSubService } from "../../utils/pubsub.service";

export class CryptopanicListenerService<T> extends ListenerService<T> {
  protected serviceKey: string;
  protected module: string;
  protected observer$ = this.httpService.get(`${this.uri}?auth_token=${this.key}&public=true&filter=hot`).pipe(
    tap(() => this.error = undefined),
    map(response => response?.data?.results),
    catchError(async (_) => {
      this.error = new GraphQLError('Problem with connection to API');
      await this.pubsub.publish(this.serviceKey, { error: this.error });
      throw this.error;
    }),
    retry(),
    tap(async (data) => {
      this.data = data;
      await this.pubsub.publish(this.serviceKey, { [this.serviceKey]: data })
    }),
    delay(this.timer),
    repeat()
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
