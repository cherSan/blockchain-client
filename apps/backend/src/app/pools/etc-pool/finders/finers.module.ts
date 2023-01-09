import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { POOL_REST_CONNECTION_URL, POOL_REST_TIMER_UPDATE } from "../contants/connection.constants";
import { PoolETCFindersService } from "./finders.service";
import { PoolETCFindersResolver } from "./finders.resolver";
import { PubSubService } from "../../../utils/pubsub.service";
@Module({
  imports: [HttpModule],
  providers: [
    PoolETCFindersService,
    PoolETCFindersResolver,
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
export class PoolETCFindersModule {}
