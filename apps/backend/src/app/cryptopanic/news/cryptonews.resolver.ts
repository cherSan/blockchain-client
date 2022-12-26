import { Query, Resolver, Subscription } from "@nestjs/graphql";
import { NotFoundException } from "@nestjs/common";
import { GraphQLError } from "graphql/error";
import { CryptonewsService } from "./cryptonews.service";
import { News } from "./cryptonews.model";

@Resolver(() => News)
export class CryptonewsResolver {
  constructor(
    private readonly service: CryptonewsService
  ) {
  }

  @Query(() => News, { name: 'hotNews' })
  async getNews(): Promise<News> {
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

  @Subscription(() => News)
  async hotNews() {
    try {
      return this.service.subscribe();
    } catch (e) {
      throw new GraphQLError(e);
    }
  }
}
