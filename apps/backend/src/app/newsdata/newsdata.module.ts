import { Module } from '@nestjs/common';
import { HttpModule } from "@nestjs/axios";
import { PubSubService } from "../utils/pubsub.service";
import {
  NEWSDATA_REST_API_KEY,
  NEWSDATA_REST_CONNECTION_URL,
  NEWSDATA_REST_TIMER_UPDATE
} from "./constants/connection.constants";
import { NewsdataResolver } from "./news/newsdata.resolver";
import { NewsdataService } from "./news/newsdata.service";

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: NEWSDATA_REST_CONNECTION_URL,
      useValue: 'https://newsdata.io/api/1/news?&q=bitcoin%20OR%20ethereum%20OR%20btc%20OR%20bth%20OR%20etc%20OR%20crypto%20OR%20cryptocurrency%20OR%20blockchain%20OE%20ethereum%20classic%20OR%20dogecoin%20OR%20cryprocoin%20OR%20usdt%20OR%20usdc%20OR%20tether%20OR%20usd%20coin%20OR%20stablecoins&language=en,ru&category=business,environment,politics,technology,top'
    },
    {
      provide: NEWSDATA_REST_TIMER_UPDATE,
      useValue: 3600000
    },
    {
      provide: NEWSDATA_REST_API_KEY,
      useValue: 'pub_1496602a8e1239fa68952fb8afbc71d6d08af'
    },
    PubSubService,
    NewsdataResolver,
    NewsdataService
  ]
})
export class NewsdataModule {}
