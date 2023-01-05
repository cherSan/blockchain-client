import { Module } from '@nestjs/common';
import { HttpModule } from "@nestjs/axios";

import { POOL_REST_CONNECTION_URL, POOL_REST_TIMER_UPDATE } from "./contants/connection.constants";

import { StatsResolver } from "./stats/stats.resolver";
import { StatsService } from "./stats/stats.service";

import { PubSubService } from "../utils/pubsub.service";
import { MinerListResolver } from "./miners/miner-list.resolver";
import { MinerListService } from "./miners/miner-list.service";
import { MinerStatisticResolver } from "./miner-statistic/miner-statistic.resolver";
import { MinerStatisticService } from "./miner-statistic/miner-statistic.service";
import { MinerStatisticRewardResolver } from "./miner-statistic/miner-stat-reward.resolver";
import { MinerStatisticsPaymentChartResolver } from "./miner-statistic/miner-stat-payment-chart.resolver";
import { MinerStatisticPaymentsResolver } from "./miner-statistic/miner-stat-payments.resolver";
import { MinerStatisticShareChartResolver } from "./miner-statistic/miner-stat-share-chart.resolver";
import { MinerStatisticMinerChartResolver } from "./miner-statistic/miner-stat-miner-chart.resolver";
import { MinerPaymentsResolver } from "./payments/miner-payments.resolver";
import { MinerPaymentsService } from "./payments/miner-payments.service";
import { MinerPaymentResolver } from "./payments/miner-payment.resolver";

@Module({
  imports: [HttpModule],
  providers: [
    StatsResolver,
    StatsService,
    MinerListResolver,
    MinerListService,
    MinerStatisticResolver,
    MinerStatisticService,
    MinerStatisticRewardResolver,
    MinerStatisticsPaymentChartResolver,
    MinerStatisticPaymentsResolver,
    MinerStatisticShareChartResolver,
    MinerStatisticMinerChartResolver,
    MinerPaymentsResolver,
    MinerPaymentsService,
    MinerPaymentResolver,
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
export class EtcPoolModule {}
