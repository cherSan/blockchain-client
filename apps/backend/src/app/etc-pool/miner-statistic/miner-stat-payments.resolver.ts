import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { MinerStatPayments } from "./miner-statistic.model";

@Resolver(() => MinerStatPayments)
export class MinerStatisticPaymentsResolver {
  @ResolveField(() => Number, {name: 'timestamp'})
  timestamp(@Parent() data: MinerStatPayments) {
    return data.timestamp * 1000
  }
}
