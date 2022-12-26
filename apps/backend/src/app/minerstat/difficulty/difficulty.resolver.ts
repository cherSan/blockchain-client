import { Query, Resolver, Subscription } from "@nestjs/graphql";
import { NotFoundException } from "@nestjs/common";
import { GraphQLError } from "graphql/error";
import { Coins } from "./difficulty.model";
import { DifficultyService } from "./difficulty.service";

@Resolver(() => [Coins])
export class DifficultyResolver {
  constructor(
    private readonly service: DifficultyService
  ) {
  }

  @Query(() => [Coins], { name: 'coins' })
  async getCoins(): Promise<Coins[]> {
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

  @Subscription(() => [Coins])
  async coins() {
    try {
      return this.service.subscribe();
    } catch (e) {
      throw new GraphQLError(e);
    }
  }
}
