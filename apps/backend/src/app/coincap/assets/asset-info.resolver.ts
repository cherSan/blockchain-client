import { Query, Resolver, Subscription } from "@nestjs/graphql";
import { GraphQLError } from "graphql/error";
import { AssetsInfo } from "./asset.model";
import { AssetService } from "./asset.service";

@Resolver(() => AssetsInfo)
export class AssetInfoResolver {
  constructor(
    private readonly service: AssetService
  ) {
  }

  @Query(() => AssetsInfo, { name: 'assets' })
  async getAssets(): Promise<AssetsInfo> {
    try {
      return await this.service.get()
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
