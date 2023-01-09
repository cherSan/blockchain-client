import { Field, ObjectType } from "@nestjs/graphql";
@ObjectType()
export class PoolETCPaymentsPayment {
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
export class PoolETCPayments {
  @Field(() => [PoolETCPaymentsPayment])
  payments: PoolETCPaymentsPayment[];
  @Field()
  paymentsTotal: number;
}
