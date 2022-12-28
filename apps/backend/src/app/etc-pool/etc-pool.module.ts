import { Module } from '@nestjs/common';
import { HttpModule } from "@nestjs/axios";

import { POOL_REST_CONNECTION_URL, POOL_REST_TIMER_UPDATE } from "./contants/connection.constants";

import { StatsResolver } from "./stats/stats.resolver";
import { StatsService } from "./stats/stats.service";

import { PubSubService } from "../utils/pubsub.service";

@Module({
  imports: [HttpModule],
  providers: [
    StatsResolver,
    StatsService,
    {
      provide: POOL_REST_TIMER_UPDATE,
      useValue: 3000
    },
    {
      provide: POOL_REST_CONNECTION_URL,
      useValue: 'http://94.19.151.45/api/'
    },
    PubSubService
  ]
})
export class EtcPoolModule {}
