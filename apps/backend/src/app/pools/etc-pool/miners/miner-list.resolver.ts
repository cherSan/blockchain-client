import { Parent, Query, ResolveField, Resolver, Subscription } from "@nestjs/graphql";
import { NotFoundException } from "@nestjs/common";
import { Miner, MinersList } from "./miner-list.model";
import { MinerListService } from "./miner-list.service";
import { GraphQLError } from "graphql/error";

type ServerMinerList = {
  miners: {
    [key: string]: Object
  }
}

@Resolver(() => MinersList)
export class MinerListResolver {
  constructor(
    private readonly statsService: MinerListService
  ) {
  }

  @Query(() => MinersList, { name: 'etcMinersList' })
  async getMinesList(): Promise<MinersList> {
    try {
      const recipe = await this.statsService.get()
      if (!recipe) {
        throw new NotFoundException();
      }
      return recipe;
    } catch (e) {
      throw new GraphQLError(e)
    }
  }

  @Subscription(() => MinersList)
  async etcMinersList() {
    try {
      return this.statsService.subscribe();
    } catch (e) {
      throw new GraphQLError(e);
    }
  }

  @ResolveField(() => [Miner], { name: 'miners' })
  miners(@Parent() minerList: ServerMinerList) {
    return Object.entries(minerList.miners).map(([k,v]) => ({
      ...v,
      id: k
    }))
  }
}
