import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CoinDynamicData {
  @Field(() => [Number], { description: 'Data timestamp' })
  labels: number[];
  @Field(() => [Number], { description: 'Pool Difficulty' })
  difficultyData: number[];
  @Field(() => [Number], { description: 'Value Of Hashrate' })
  hashrateData: number[];
  @Field(() => [Number], { description: 'Dynamic Price' })
  priceData: number[];
}
