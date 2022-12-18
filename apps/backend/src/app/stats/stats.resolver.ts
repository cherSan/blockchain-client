import { Query, Resolver, Subscription } from "@nestjs/graphql";
import { NotFoundException } from "@nestjs/common";
import { Stats } from "./stats.model";
import { StatsService } from "./stats.service";

@Resolver(of => Stats)
export class StatsResolver {
  constructor(
    private readonly statsService: StatsService
  ) {
  }

  @Query(() => Stats, { name: 'stats' })
  async getStats(): Promise<Stats> {
    const recipe = await this.statsService.get();
    if (!recipe) {
      throw new NotFoundException();
    }
    return recipe;
  }

  @Subscription(() => Stats)
  async stats() {
    return this.statsService.pubsub.asyncIterator('stats');
  }
}
