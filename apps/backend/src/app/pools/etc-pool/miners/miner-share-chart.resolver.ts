import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { PoolETCMinerShareChart } from "./miner.model";
@Resolver(() => PoolETCMinerShareChart)
export class PoolETCMinerShareChartResolver {
  @ResolveField(() => Number, {name: 'x'})
  x(@Parent() data: PoolETCMinerShareChart) {
    return data.x * 1000
  }
  @ResolveField(() => Number, {name: 'workerOnline'})
  workerOnline(@Parent() data: PoolETCMinerShareChart) {
    return parseFloat(`${data.workerOnline}`);
  }
}
