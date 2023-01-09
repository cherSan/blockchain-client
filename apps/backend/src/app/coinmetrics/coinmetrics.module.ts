import { Module } from '@nestjs/common';
import { HttpModule } from "@nestjs/axios";
import { COINMETRICS_REST_CONNECTION_URL } from "./constants/connection.constants";
import { CMMetricsResolver } from "./resolvers/metrics.resolver";
import { CMAssetsResolver } from "./resolvers/assets.resolver";
import { CMAssetsHistoryResolver } from "./resolvers/assets-history.resolver";
import { CMAssetsPriceHistoryResolver } from "./resolvers/assets-price-history.resolver";
import { CMAssetHistoryResolver } from "./resolvers/asset-history.resolver";
import { CMAssetLastPriceResolver } from "./resolvers/asset-last-price.resolver";
import { CMAssetPriceHistoryResolver } from "./resolvers/asset-price-history.resolver";
import { CMAssetsLastPriceResolver } from "./resolvers/assets-last-price.resolver";
import { CMMetricsService } from "./services/metrics.service";
import { CMAssetsHistoryService } from "./services/assets-history.service";
import { CMPriceHistoryService } from "./services/price-history.service";
import { PubSubService } from "../utils/pubsub.service";
@Module({
  imports: [HttpModule],
  providers: [
    CMMetricsResolver,
    CMAssetsResolver,
    CMAssetsHistoryResolver,
    CMAssetsPriceHistoryResolver,
    CMAssetHistoryResolver,
    CMAssetLastPriceResolver,
    CMAssetPriceHistoryResolver,
    CMAssetsLastPriceResolver,
    CMMetricsService,
    CMAssetsHistoryService,
    CMPriceHistoryService,
    PubSubService,
    {
      provide: COINMETRICS_REST_CONNECTION_URL,
      useValue: 'https://community-api.coinmetrics.io/v4/'
    }
  ]
})
export class CoinmetricsModule {}
