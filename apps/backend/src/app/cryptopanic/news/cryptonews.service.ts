import { Inject, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { CryptoNews } from "./cryptonews.model";
import {
    CRYPTOPANIC_REST_API_KEY,
  CRYPTOPANIC_REST_CONNECTION_URL,
  CRYPTOPANIC_REST_TIMER_UPDATE
} from "../constants/connection.constants";
import { PubSubService } from "../../utils/pubsub.service";
import { CryptopanicListenerService } from "../utils/cryptopanic-listener.service";


@Injectable()
export class CryptonewsService extends CryptopanicListenerService<CryptoNews[]> {
  protected serviceKey = 'news';
  constructor(
    @Inject(CRYPTOPANIC_REST_TIMER_UPDATE) protected readonly timer: number,
    @Inject(CRYPTOPANIC_REST_CONNECTION_URL) protected readonly uri: string,
    @Inject(CRYPTOPANIC_REST_API_KEY) protected readonly key: string,
    protected readonly httpService: HttpService,
    protected readonly pubsub: PubSubService
  ) {
    super(timer, uri, key, httpService, pubsub);
    this.observer$.subscribe();
  }
}
