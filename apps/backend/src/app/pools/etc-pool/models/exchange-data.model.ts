import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType({ description: 'exchange data' })
export class ExchangeData {
  @Field()
  ath : string;
  @Field()
  ath_change_percentage : string;
  @Field()
  ath_date : string;
  @Field()
  atl : string;
  @Field()
  atl_change_percentage : string;
  @Field()
  atl_date : string;
  @Field()
  circulating_supply : string;
  @Field()
  current_price : string;
  @Field()
  fully_diluted_valuation : string;
  @Field()
  high_24h : string;
  @Field()
  id : string;
  @Field()
  image : string;
  @Field()
  last_updated : string;
  @Field()
  low_24h : string;
  @Field()
  market_cap : string;
  @Field()
  market_cap_change_24h : string;
  @Field()
  market_cap_change_percentage_24h : string;
  @Field()
  market_cap_rank : string;
  @Field()
  max_supply : string;
  @Field()
  name : string;
  @Field()
  price_change_24h : string;
  @Field()
  price_change_percentage_24h : string;
  @Field()
  roi : string;
  @Field()
  symbol : string;
  @Field()
  total_supply : string;
  @Field()
  total_volume : string;
}
