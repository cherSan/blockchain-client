import { PoolETCMinerStats } from "./miner.model";
import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
@Resolver(() => PoolETCMinerStats)
export class PoolETCMinerStatsResolver {
  @ResolveField(() => Number, {name: 'lastShare'})
  lastShare(@Parent() data: PoolETCMinerStats) {
    return data.lastShare * 1000
  }
  @ResolveField(() => Number, {name: 'balance'})
  balance(@Parent() data: PoolETCMinerStats) {
    return (data.balance * 0.000000001);
  }
  @ResolveField(() => Number, {name: 'pending'})
  pending(@Parent() data: PoolETCMinerStats) {
    return (data.pending * 0.000000001);
  }
  @ResolveField(() => Number, {name: 'paid'})
  paid(@Parent() data: PoolETCMinerStats) {
    return (data.paid * 0.000000001);
  }
}

