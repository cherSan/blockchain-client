import { Field, ObjectType } from "@nestjs/graphql";
@ObjectType()
export class MinerPayment {
  @Field()
  address: string;
  @Field()
  amount: number;
  @Field()
  timestamp: number;
  @Field()
  tx: string;
}
@ObjectType()
export class MinerPayments {
  @Field(() => [MinerPayment])
  payments: MinerPayment[];
}
