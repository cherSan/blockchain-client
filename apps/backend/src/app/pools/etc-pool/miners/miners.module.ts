import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { POOL_REST_CONNECTION_URL, POOL_REST_TIMER_UPDATE } from "../contants/connection.constants";
import { PoolETCMinersService } from "./miners.service";
import { PoolETCMinersResolver } from "./miners.resolver";
import { PubSubService } from "../../../utils/pubsub.service";
import { PoolETCMinerService } from "./miner.service";
import { PoolETCMinerResolver } from "./miner.resolver";
import { PoolETCMinerChartResolver } from "./miner-chart.resolver";
import { PoolETCMinerPaymentChartResolver } from "./miner-payment-chart.resolver";
import { PoolETCMinerPaymentsResolver } from "./miner-payments.resolver";
import { PoolETCMinerRewardResolver } from "./miner-reward.resolver";
import { PoolETCMinerShareChartResolver } from "./miner-share-chart.resolver";
import { PoolETCMinerStatsResolver } from "./miner-stats.resolver";
import { PoolETCMinerSumRewardResolver } from "./miner-sum-reward.resolver";
@Module({
  imports: [HttpModule],
  providers: [
    PoolETCMinersService,
    PoolETCMinerService,
    PoolETCMinersResolver,
    PoolETCMinerResolver,
    PoolETCMinerChartResolver,
    PoolETCMinerPaymentChartResolver,
    PoolETCMinerPaymentsResolver,
    PoolETCMinerRewardResolver,
    PoolETCMinerShareChartResolver,
    PoolETCMinerStatsResolver,
    PoolETCMinerSumRewardResolver,
    PubSubService,
    {
      provide: POOL_REST_TIMER_UPDATE,
      useValue: 10000
    },
    {
      provide: POOL_REST_CONNECTION_URL,
      useValue: 'http://94.19.151.45/api/'
    }
  ]
})
export class PoolETCMinersModule {}
