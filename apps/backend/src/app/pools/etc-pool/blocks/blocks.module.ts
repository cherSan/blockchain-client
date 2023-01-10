import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import {
  POOL_REST_CONNECTION_URL, POOL_REST_CONNECTION_URL_VALUE,
  POOL_REST_TIMER_UPDATE,
  POOL_REST_TIMER_UPDATE_VALUE
} from "../contants/connection.constants";
import { PubSubService } from "../../../utils/pubsub.service";
import { PoolETCBlocksService } from "./blocks.service";
import { PoolETCBlocksResolver } from "./blocks.resolver";
import { PoolETCBlocksInfoResolver } from "./blocks-info.resolver";
import { PoolETCBlocksLuckChartsResolver } from "./blocks-luck-charts.resolver";
@Module({
  imports: [HttpModule],
  providers: [
    PoolETCBlocksService,
    PoolETCBlocksResolver,
    PoolETCBlocksInfoResolver,
    PoolETCBlocksLuckChartsResolver,
    PubSubService,
    {
      provide: POOL_REST_TIMER_UPDATE,
      useValue: POOL_REST_TIMER_UPDATE_VALUE
    },
    {
      provide: POOL_REST_CONNECTION_URL,
      useValue: POOL_REST_CONNECTION_URL_VALUE
    }
  ]
})
export class PoolETCBlocksModule {}
