import { Module } from '@nestjs/common';
import { HttpModule } from "@nestjs/axios";

import {
  ETHERS_REST_API_KEY,
  ETHERS_REST_CONNECTION_URL,
  ETHERS_REST_TIMER_UPDATE
} from "./constants/connection.constants";

import { PubSubService } from "../utils/pubsub.service";
import { StatsService } from "./stats/stats.service";
import { StatsResolver } from "./stats/stats.resolver";

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: ETHERS_REST_API_KEY,
      useValue:'GSBC28V3M5T31YVXASTDHF7NZZK6I29ETM'
    },
    {
      provide: ETHERS_REST_CONNECTION_URL,
      useValue: 'https://api.etherscan.io/api'
    },
    {
      provide: ETHERS_REST_TIMER_UPDATE,
      useValue: 10000
    },
    StatsService,
    StatsResolver,
    PubSubService
  ]
})
export class EthersModule {}
