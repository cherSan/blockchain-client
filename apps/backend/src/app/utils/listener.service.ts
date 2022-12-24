import { GraphQLError } from "graphql/error";
import { catchError, interval, map, retry, switchMap, tap, timeInterval } from "rxjs";
import { HttpService } from "@nestjs/axios";
import { PubSubService } from "./pubsub.service";

export class ListenerService<T> {
  protected serviceKey;
  protected data: T;
  protected error?: GraphQLError = undefined;
  protected observer$ = interval(this.timer).pipe(
    timeInterval(),
    switchMap(() => this.httpService.get(`${this.uri}${this.serviceKey}`)),
    tap(() => this.error = undefined),
    map(response => response?.data),
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
    protected readonly httpService: HttpService,
    protected readonly pubsub: PubSubService
  ) {
  }
  async get(): Promise<T> {
    if (this.error) {
      throw this.error;
    }
    return this.data;
  }

  subscribe(): AsyncIterator<T> {
    return this.pubsub.subscribe<T>(this.serviceKey)
  }
}
