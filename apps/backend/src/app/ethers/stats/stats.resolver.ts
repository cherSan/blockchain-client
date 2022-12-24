import { Query, Resolver, Subscription } from "@nestjs/graphql";
import { NotFoundException } from "@nestjs/common";
import { GraphQLError } from "graphql/error";
import { EtherStats } from "./stats.model";
import { StatsService } from "./stats.service";

@Resolver(() => EtherStats)
export class StatsResolver {
  constructor(
    private readonly service: StatsService
  ) {
  }

  @Query(() => EtherStats, { name: 'etherStats' })
  async getEtherStats(): Promise<EtherStats> {
    try {
      const recipe = await this.service.get()
      if (!recipe) {
        throw new NotFoundException();
      }
      return recipe;
    } catch (e) {
      throw new GraphQLError(e)
    }
  }

  @Subscription(() => EtherStats)
  async etherStats() {
    try {
      return this.service.subscribe();
    } catch (e) {
      throw new GraphQLError(e);
    }
  }
}
