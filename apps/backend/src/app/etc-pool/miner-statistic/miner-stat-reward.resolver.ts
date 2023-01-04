import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { MinerStatReward } from "./miner-statistic.model";

@Resolver(() => MinerStatReward)
export class MinerStatisticRewardResolver {
  @ResolveField(() => Number, {name: 'timestamp'})
  timestamp(@Parent() data: MinerStatReward) {
    return data.timestamp * 1000
  }
}
