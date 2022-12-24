import { Module } from '@nestjs/common';
import { HttpModule } from "@nestjs/axios";
import { StatsResolver } from "./stats.resolver";
import { StatsService } from "./stats.service";
import { LAKE_TIMER } from "../injection/lake-timer.injection";
import { LAKE_URI } from "../injection/lake-url.injection";
import { PubSubService } from "../utils/pubsub.service";

@Module({
  imports: [HttpModule],
  providers: [
    StatsResolver,
    StatsService,
    {
      provide: LAKE_TIMER,
      useValue: 3000
    },
    {
      provide: LAKE_URI,
      useValue: 'http://94.19.151.45/api/stats'
    },
    PubSubService
  ]
})
export class StatsModule {}
