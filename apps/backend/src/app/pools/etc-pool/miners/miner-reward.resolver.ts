import { PoolETCMinerReward } from "./miner.model";
import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
@Resolver(() => PoolETCMinerReward)
export class PoolETCMinerRewardResolver {
  @ResolveField(() => Number, {name: 'timestamp'})
  timestamp(@Parent() data: PoolETCMinerReward) {
    return data.timestamp * 1000
  }
  @ResolveField(() => Number, {name: 'reward'})
  reward(@Parent() data: PoolETCMinerReward) {
    return data.reward * 0.000000001
  }
}

