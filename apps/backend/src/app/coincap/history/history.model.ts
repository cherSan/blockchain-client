import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: 'volume-weighted price based on real-time market data, translated to USD' })
export class History {
  @Field()
  priceUsd: string;
  @Field()
  time: string;
  @Field()
  date: string;
}

@ObjectType({ description: 'volume-weighted price based on real-time market data, translated to USD' })
export class HistoryInfo {
  @Field(() => [History])
  data: History[];
  @Field()
  timestamp: number;
}
