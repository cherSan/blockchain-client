import { Query, Resolver, Subscription } from "@nestjs/graphql";
import { NotFoundException } from "@nestjs/common";
import { GraphQLError } from "graphql/error";
import { CryptonewsService } from "./cryptonews.service";
import { CryptoNews } from "./cryptonews.model";

@Resolver(() => [CryptoNews])
export class CryptonewsResolver {
  constructor(
    private readonly service: CryptonewsService
  ) {
  }

  @Query(() => [CryptoNews], { name: 'hotNews' })
  async getNews(): Promise<CryptoNews[]> {
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

  @Subscription(() => [CryptoNews])
  async hotNews() {
    try {
      return this.service.subscribe();
    } catch (e) {
      throw new GraphQLError(e);
    }
  }
}
