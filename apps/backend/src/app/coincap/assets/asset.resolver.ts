import { Query, Resolver, Subscription } from "@nestjs/graphql";
import { NotFoundException } from "@nestjs/common";
import { GraphQLError } from "graphql/error";
import { AssetsInfo } from "./asset.model";
import { AssetService } from "./asset.service";

@Resolver(() => AssetsInfo)
export class AssetResolver {
  constructor(
    private readonly service: AssetService
  ) {
  }

  @Query(() => AssetsInfo, { name: 'assets' })
  async getAssets(): Promise<AssetsInfo> {
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

  @Subscription(() => AssetsInfo)
  async assets() {
    try {
      return this.service.subscribe();
    } catch (e) {
      throw new GraphQLError(e);
    }
  }
}
