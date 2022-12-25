import { Field, ObjectType } from "@nestjs/graphql";
@ObjectType({
  description: 'Returns the current amount of Ether in circulation, ETH2 Staking rewards and EIP1559 burnt fees statistics.'
})
export class EtherStatsData {
  @Field()
  EthSupply: string;
  @Field()
  Eth2Staking: string;
  @Field()
  BurntFees: string;
}
@ObjectType({
  description: 'Returns the current amount of Ether in circulation, ETH2 Staking rewards and EIP1559 burnt fees statistics.'
})
export class EtherStats {
  @Field(() => EtherStatsData)
  result: EtherStatsData
  @Field()
  status: string;
  @Field()
  message: string;
}
