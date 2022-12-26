import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";

import {
  CRYPTOPANIC_REST_API_KEY,
  CRYPTOPANIC_REST_CONNECTION_URL,
  CRYPTOPANIC_REST_TIMER_UPDATE
} from "./constants/connection.constants";
import { PubSubService } from "../utils/pubsub.service";
import { CryptonewsService } from "./news/cryptonews.service";
import { CryptonewsResolver } from "./news/cryptonews.resolver";


@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: CRYPTOPANIC_REST_API_KEY,
      useValue:'b9d792c3f70890c3014698c09d8ccc610158687b'
    },
    {
      provide: CRYPTOPANIC_REST_CONNECTION_URL,
      useValue: 'https://cryptopanic.com/api/v1/posts/'
    },
    {
      provide: CRYPTOPANIC_REST_TIMER_UPDATE,
      useValue: 3600000
    },
    CryptonewsService,
    CryptonewsResolver,
    PubSubService
  ]
})
export class CryptopanicModule {}
