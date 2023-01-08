import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { POOL_REST_CONNECTION_URL, POOL_REST_TIMER_UPDATE } from "../contants/connection.constants";
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
      useValue: 10000
    },
    {
      provide: POOL_REST_CONNECTION_URL,
      useValue: 'http://94.19.151.45/api/'
    },
    PubSubService
  ]
})
export class PoolETCStatsModule {}
