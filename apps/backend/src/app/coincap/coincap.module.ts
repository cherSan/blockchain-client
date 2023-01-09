import { Module } from '@nestjs/common';
import { HttpModule } from "@nestjs/axios";
import { COINCAP_REST_CONNECTION_URL, COINCAP_REST_TIMER_UPDATE } from "./constants/connection.constants";
import { PubSubService } from "../utils/pubsub.service";
import { RateService } from "./rates/rate.service";
import { RateResolver } from "./rates/rate.resolver";
import { AssetService } from "./assets/asset.service";
import { AssetInfoResolver } from "./assets/asset-info.resolver";
import { ETCHistoryService } from "./etc-history/history.service";
import { ETCHistoryResolver } from "./etc-history/history.resolver";

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: COINCAP_REST_CONNECTION_URL,
      useValue: 'https://api.coincap.io/v2/'
    },
    {
      provide: COINCAP_REST_TIMER_UPDATE,
      useValue: 30000
    },
    RateService,
    RateResolver,
    AssetService,
    AssetInfoResolver,
    ETCHistoryService,
    ETCHistoryResolver,
    PubSubService
  ]
})
export class CoincapModule {}
