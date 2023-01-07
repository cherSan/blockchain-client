import { Query, Resolver } from "@nestjs/graphql";
import { CMAssets } from "../models/assets.model";
import { AssetList } from "../constants/assets.constants";

@Resolver(() => CMAssets)
export class CMAssetsResolver {
  @Query(() => CMAssets, { name: 'cmAssets' })
  async getCMAssets(): Promise<CMAssets> {
    return {
      list: AssetList
    }
  }
}
