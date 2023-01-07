import { Module } from '@nestjs/common';
import { HttpModule } from "@nestjs/axios";
import { COINMETRICS_REST_CONNECTION_URL } from "./constants/connection.constants";
import { CMMetricsResolver } from "./resolvers/metrics.resolver";
import { CMAssetsResolver } from "./resolvers/assets.resolver";
import { CMMetricsService } from "./services/metrics.service";
import { PubSubService } from "../utils/pubsub.service";
import { CMOneDayService } from "./services/one-day.service";
import { CMOneHourService } from "./services/one-hour.service";
import { CMOneDayResolver } from "./resolvers/one-day.resolver";
import { CMOneHourResolver } from "./resolvers/one-hour.resolver";
import { CmOneDayDataResolver } from "./resolvers/one-day-data.resolver";
import { CmOneHourDataResolver } from "./resolvers/one-hour-data.resolver";
import { CmLastDataResolver } from "./resolvers/last-data.resolver";
import { CMLastResolver } from "./resolvers/last.resolver";
@Module({
  imports: [HttpModule],
  providers: [
    CMMetricsResolver,
    CMAssetsResolver,
    CMOneDayResolver,
    CMOneHourResolver,
    CmOneDayDataResolver,
    CmOneHourDataResolver,
    CmLastDataResolver,
    CMLastResolver,
    CMMetricsService,
    CMOneDayService,
    CMOneHourService,
    PubSubService,
    {
      provide: COINMETRICS_REST_CONNECTION_URL,
      useValue: 'https://community-api.coinmetrics.io/v4/'
    }
  ]
})
export class CoinmetricsModule {}
