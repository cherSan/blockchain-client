import { Module } from '@nestjs/common';
import { HttpModule } from "@nestjs/axios";
import { PubSubService } from "../utils/pubsub.service";
import { MINERSTAT_REST_CONNECTION_URL, MINERSTAT_REST_TIMER_UPDATE } from "./constants/connection.constants";
import { CoinsService } from "./coins/coins.service";
import { CoinsResolver } from "./coins/coins.resolver";

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: MINERSTAT_REST_CONNECTION_URL,
      useValue: 'https://api.minerstat.com/v2/'
    },
    {
      provide: MINERSTAT_REST_TIMER_UPDATE,
      useValue: 5000
    },
    CoinsService,
    CoinsResolver,
    PubSubService
  ]
})
export class MinerstatModule {}
