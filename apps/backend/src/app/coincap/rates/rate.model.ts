import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";

export enum CurrencyType {
  FIAT = 'fiat',
  CRYPTO = 'crypto',
}

registerEnumType(CurrencyType, {
  name: 'CurrencyType',
  description: 'The supported currency types.',
});

@ObjectType({ description: 'node rates' })
export class Rate {
  @Field()
  id: string;
  @Field()
  symbol: string;
  @Field({ nullable: true })
  currencySymbol: string;
  @Field(() => CurrencyType)
  type: CurrencyType;
  @Field()
  rateUsd: number;
}

@ObjectType({ description: 'node assets' })
export class RatesInfo {
  @Field(() => [Rate])
  data: Rate[];
  @Field()
  timestamp: number;
}
