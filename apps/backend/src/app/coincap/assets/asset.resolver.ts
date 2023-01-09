import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Asset } from "./asset.model";

@Resolver(() => Asset)
export class AssetResolver {
  @ResolveField(() => Number, { name: 'rank' })
  async rank(@Parent() data: Asset) {
    return parseInt(`${data.rank || 0}`)
  }
  @ResolveField(() => Number, { name: 'supply' })
  async supply(@Parent() data: Asset) {
    return parseFloat(`${data.supply || 0}`)
  }
  @ResolveField(() => Number, { name: 'maxSupply' })
  async maxSupply(@Parent() data: Asset) {
    return parseFloat(`${data.maxSupply || 0}`)
  }
  @ResolveField(() => Number, { name: 'marketCapUsd' })
  async marketCapUsd(@Parent() data: Asset) {
    return parseFloat(`${data.marketCapUsd || 0}`)
  }
  @ResolveField(() => Number, { name: 'volumeUsd24Hr' })
  async volumeUsd24Hr(@Parent() data: Asset) {
    return parseFloat(`${data.volumeUsd24Hr || 0}`)
  }
  @ResolveField(() => Number, { name: 'priceUsd' })
  async priceUsd(@Parent() data: Asset) {
    return parseFloat(`${data.priceUsd || 0}`)
  }
  @ResolveField(() => Number, { name: 'changePercent24Hr' })
  async changePercent24Hr(@Parent() data: Asset) {
    return parseFloat(`${data.changePercent24Hr || 0}`)
  }
  @ResolveField(() => Number, { name: 'vwap24Hr' })
  async vwap24Hr(@Parent() data: Asset) {
    return parseFloat(`${data.vwap24Hr || 0}`)
  }
}
