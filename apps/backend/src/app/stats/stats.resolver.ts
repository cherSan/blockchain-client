import { Query, Resolver, Subscription } from "@nestjs/graphql";
import { NotFoundException } from "@nestjs/common";
import { Stats } from "./stats.model";
import { StatsService } from "./stats.service";
import { GraphQLError } from "graphql/error";

@Resolver(() => Stats)
export class StatsResolver {
  constructor(
    private readonly statsService: StatsService
  ) {
  }

  @Query(() => Stats, { name: 'stats' })
  async getStats(): Promise<Stats> {
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

  @Subscription(() => Stats)
  async stats() {
    try {
      return this.statsService.subscribe();
    } catch (e) {
      throw new GraphQLError(e);
    }
  }
}
