import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { PoolETCMinerChart } from "./miner.model";
@Resolver(() => PoolETCMinerChart)
export class PoolETCMinerChartResolver {
  @ResolveField(() => Number, {name: 'x'})
  x(@Parent() data: PoolETCMinerChart) {
    return data.x * 1000
  }
  @ResolveField(() => Number, {name: 'workerOnline'})
  workerOnline(@Parent() data: PoolETCMinerChart) {
    return parseFloat(`${data.workerOnline}`);
  }
}
