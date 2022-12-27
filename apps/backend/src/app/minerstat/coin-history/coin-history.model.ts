import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
class CoinHistoryData {
  @Field()
  timestamp: number;
  @Field({description: 'arr[1]'})
  network_hashrate: number;
  @Field({description: 'arr[0]'})
  difficulty: number;
  @Field({description: 'arr[3]'})
  price: number;
  @Field({description: 'arr[2]'})
  unknown_field: number;
}

@ObjectType()
export class CoinHistory {
  @Field()
  update_at: number;
  @Field(() => [CoinHistoryData])
  data: CoinHistoryData[];
}
