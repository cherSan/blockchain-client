import { Module } from '@nestjs/common';
import { HttpModule } from "@nestjs/axios";
import { PubSubService } from "../utils/pubsub.service";
import { MINERSTAT_REST_CONNECTION_URL, MINERSTAT_REST_TIMER_UPDATE } from "./constants/connection.constants";
import { CoinsService } from "./coins/coins.service";
import { CoinsResolver } from "./coins/coins.resolver";
import { CoinHistoryService } from "./coin-history/coin-history.service";
import { CoinHistoryResolver } from "./coin-history/coin-history.resolver";

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: MINERSTAT_REST_CONNECTION_URL,
      useValue: 'https://api.minerstat.com/v2/'
    },
    {
      provide: MINERSTAT_REST_TIMER_UPDATE,
      useValue: 60000
    },
    CoinsService,
    CoinsResolver,
    CoinHistoryService,
    CoinHistoryResolver,
    PubSubService,
  ]
})
export class MinerstatModule {}
