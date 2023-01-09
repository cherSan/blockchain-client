import { PoolETCMinerPayments } from "./miner.model";
import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
@Resolver(() => PoolETCMinerPayments)
export class PoolETCMinerPaymentsResolver {
  @ResolveField(() => Number, {name: 'timestamp'})
  timestamp(@Parent() data: PoolETCMinerPayments) {
    return data.timestamp * 1000
  }
  @ResolveField(() => Number, {name: 'amount'})
  amount(@Parent() data: PoolETCMinerPayments) {
    return data.amount * 0.000000001
  }
}

