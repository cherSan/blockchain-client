import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import {
  POOL_REST_CONNECTION_URL, POOL_REST_CONNECTION_URL_VALUE,
  POOL_REST_TIMER_UPDATE,
  POOL_REST_TIMER_UPDATE_VALUE
} from "../contants/connection.constants";
import { PoolETCStatsChartResolver } from "./charts.resolver";
import { PoolETCStatsNodeResolver } from "./node.resolver";
import { PoolETCStatsStatResolver } from "./stat.resolver";
import { PoolETCStatsResolver } from "./stats.resolver";
import { PoolETCStatsService } from "./stats.service";
import { PubSubService } from "../../../utils/pubsub.service";
@Module({
  imports: [HttpModule],
  providers: [
    PoolETCStatsStatResolver,
    PoolETCStatsChartResolver,
    PoolETCStatsNodeResolver,
    PoolETCStatsResolver,
    PoolETCStatsService,
    {
      provide: POOL_REST_TIMER_UPDATE,
      useValue: POOL_REST_TIMER_UPDATE_VALUE
    },
    {
      provide: POOL_REST_CONNECTION_URL,
      useValue: POOL_REST_CONNECTION_URL_VALUE
    },
    PubSubService
  ]
})
export class PoolETCStatsModule {}
