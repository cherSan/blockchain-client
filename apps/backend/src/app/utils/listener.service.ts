import { GraphQLError } from "graphql/error";
import { catchError, delay, map, Observable, repeat, retry, tap } from "rxjs";
import { HttpService } from "@nestjs/axios";
import { PubSubService } from "./pubsub.service";

export class ListenerService<T> {
  protected serviceKey;
  protected data: T;
  protected error?: GraphQLError = undefined;
  constructor(
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
  protected observer$(url: string, timer: number): Observable<T> {
    return this.httpService.get(url).pipe(
      tap(() => this.error = undefined),
      map(response => response?.data),
      catchError(async (e) => {
        console.error(e.response.data);
        this.error = new GraphQLError('Problem with connection to API');
        await this.pubsub.publish(this.serviceKey, { error: this.error });
        throw this.error;
      }),
      retry({
        delay: 5000
      }),
      tap(async (data) => {
        this.data = data;
        await this.pubsub.publish(this.serviceKey, { [this.serviceKey]: data })
      }),
      delay(timer),
      repeat()
    );
  }
}
