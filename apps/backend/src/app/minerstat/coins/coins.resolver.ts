import { Args, Query, Resolver, Subscription } from "@nestjs/graphql";
import { NotFoundException } from "@nestjs/common";
import { GraphQLError } from "graphql/error";
import { Coins } from "./coins.model";
import { CoinsService } from "./coins.service";
import { CoinDynamicData } from "./dynamic-data.model";

@Resolver(() => [Coins])
export class CoinsResolver {
  constructor(
    private readonly service: CoinsService
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

  @Query(() => CoinDynamicData, { name: 'coinDynamicData' })
  async getDynamicData(@Args('coin') coin: string): Promise<CoinDynamicData> {
    try {
      const recipe: CoinDynamicData = await this.service.getDynamicData(coin)
      if (!recipe) {
        throw new NotFoundException();
      }
      return recipe;
    } catch (e) {
      throw new GraphQLError(e)
    }
  }

  @Subscription(() => CoinDynamicData)
  async coinDynamicData(@Args('coin') coin: string) {
    try {
      return this.service.subscribeDynamicData(coin);
    } catch (e) {
      throw new GraphQLError(e);
    }
  }
}
