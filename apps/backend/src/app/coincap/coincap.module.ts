import { Module } from '@nestjs/common';
import { HttpModule } from "@nestjs/axios";
import { COINCAP_REST_CONNECTION_URL, COINCAP_REST_TIMER_UPDATE } from "./constants/connection.constants";
import { PubSubService } from "../utils/pubsub.service";
import { RateService } from "./rates/rate.service";
import { RateResolver } from "./rates/rate.resolver";
import { AssetService } from "./assets/asset.service";
import { AssetResolver } from "./assets/asset.resolver";
import { HistoryService } from "./history/history.service";
import { HistoryResolver } from "./history/history.resolver";

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: COINCAP_REST_CONNECTION_URL,
      useValue: 'https://api.coincap.io/v2/'
    },
    {
      provide: COINCAP_REST_TIMER_UPDATE,
      useValue: 5000
    },
    RateService,
    RateResolver,
    AssetService,
    AssetResolver,
    HistoryService,
    HistoryResolver,
    PubSubService
  ]
})
export class CoincapModule {}
