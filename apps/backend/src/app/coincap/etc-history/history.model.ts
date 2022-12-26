import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: 'volume-weighted price based on real-time market data, translated to USD' })
export class ETCHistory {
  @Field()
  priceUsd: string;
  @Field()
  time: string;
  @Field()
  date: string;
}

@ObjectType({ description: 'volume-weighted price based on real-time market data, translated to USD' })
export class ETCHistoryInfo {
  @Field(() => [ETCHistory])
  data: History[];
  @Field()
  timestamp: number;
}
