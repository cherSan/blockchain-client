import { Module } from '@nestjs/common';
import { HttpModule } from "@nestjs/axios";
import { PoolETCStatsModule } from "./stats/stats.module";
import { PoolETCPaymentsModule } from "./payments/payments.module";
import { PoolETCMinersModule } from "./miners/miners.module";
@Module({
  imports: [
    HttpModule,
    PoolETCStatsModule,
    PoolETCPaymentsModule,
    PoolETCMinersModule
  ]
})
export class EtcPoolModule {}
