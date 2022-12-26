import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { News } from "./cryptonews.model";
import {
  CRYPTOPANIC_REST_API_KEY,
  CRYPTOPANIC_REST_CONNECTION_URL,
  CRYPTOPANIC_REST_TIMER_UPDATE
} from "../constants/connection.constants";
import { PubSubService } from "../../utils/pubsub.service";
import { ListenerService } from "../../utils/listener.service";


@Injectable()
export class CryptonewsService extends ListenerService<News> {
  protected serviceKey = 'hotNews';
  constructor(
    @Inject(CRYPTOPANIC_REST_TIMER_UPDATE) protected readonly timer: number,
    @Inject(CRYPTOPANIC_REST_CONNECTION_URL) protected readonly uri: string,
    @Inject(CRYPTOPANIC_REST_API_KEY) protected readonly key: string,
    protected readonly httpService: HttpService,
    protected readonly pubsub: PubSubService
  ) {
    super(httpService, pubsub);
    this.observer$(`${this.uri}?auth_token=${this.key}&public=true&filter=hot`, timer).subscribe();
  }
}
