import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { PoolETCMinerPaymentChart } from "./miner.model";
@Resolver(() => PoolETCMinerPaymentChart)
export class PoolETCMinerPaymentChartResolver {
  @ResolveField(() => Number, {name: 'x'})
  x(@Parent() data: PoolETCMinerPaymentChart) {
    return data.x * 1000
  }
  @ResolveField(() => Number, {name: 'amount'})
  amount(@Parent() data: PoolETCMinerPaymentChart) {
    return data.amount * 0.000000001
  }
}
