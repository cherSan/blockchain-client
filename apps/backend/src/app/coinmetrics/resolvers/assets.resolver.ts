import { Query, Resolver, Subscription } from "@nestjs/graphql";
import { CMAssets } from "../models/assets.model";
import { AssetList } from "../constants/assets.constants";
import { PubSubService } from "../../utils/pubsub.service";

@Resolver(() => CMAssets)
export class CMAssetsResolver {
  constructor(
    protected readonly pubsub: PubSubService
  ) {
    this.pubsub.publish('cmAssets', {'cmAssets': {
      list: AssetList
    }})
    setInterval(async () => {
      await this.pubsub.publish('cmAssets', {'cmAssets': {
        list: AssetList
      }})
    }, 60*60*1000)
  }
  @Query(() => CMAssets, { name: 'cmAssets' })
  async cmAssetsGet(): Promise<CMAssets> {
    return {
      list: AssetList
    }
  }
  @Subscription(() => CMAssets, { name: 'cmAssets' })
  async cmAssetsSubscription() {
    return this.pubsub.subscribe('cmAssets')
  }
}
