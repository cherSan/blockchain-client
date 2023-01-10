import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import {
  POOL_REST_CONNECTION_URL, POOL_REST_CONNECTION_URL_VALUE,
  POOL_REST_TIMER_UPDATE,
  POOL_REST_TIMER_UPDATE_VALUE
} from "../contants/connection.constants";
import { PoolETCPaymentsResolver } from "./payments.resolver";
import { PoolETCPaymentsPaymentResolver } from "./payment.resolver";
import { PoolETCPaymentsService } from "./payments.service";
import { PubSubService } from "../../../utils/pubsub.service";
@Module({
  imports: [HttpModule],
  providers: [
    PoolETCPaymentsResolver,
    PoolETCPaymentsPaymentResolver,
    PoolETCPaymentsService,
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
export class PoolETCPaymentsModule {}
