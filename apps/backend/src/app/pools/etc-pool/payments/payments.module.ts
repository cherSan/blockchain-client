import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { POOL_REST_CONNECTION_URL, POOL_REST_TIMER_UPDATE } from "../contants/connection.constants";
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
      useValue: 10000
    },
    {
      provide: POOL_REST_CONNECTION_URL,
      useValue: 'http://94.19.151.45/api/'
    }
  ]
})
export class PoolETCPaymentsModule {}
