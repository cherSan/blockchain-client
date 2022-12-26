import { Query, Resolver, Subscription } from "@nestjs/graphql";
import { NotFoundException } from "@nestjs/common";
import { GraphQLError } from "graphql/error";
import { NewsData } from "./newsdata.model";
import { NewsdataService } from "./newsdata.service";

@Resolver(() => NewsData)
export class NewsdataResolver {
  constructor(
    private readonly service: NewsdataService
  ) {
  }

  @Query(() => NewsData, { name: 'newsData' })
  async getNews(): Promise<NewsData> {
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

  @Subscription(() => NewsData)
  async newsData() {
    try {
      return this.service.subscribe();
    } catch (e) {
      throw new GraphQLError(e);
    }
  }
}
