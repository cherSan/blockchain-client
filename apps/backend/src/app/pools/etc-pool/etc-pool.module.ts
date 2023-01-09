import { Module } from '@nestjs/common';
import { HttpModule } from "@nestjs/axios";
import { PoolETCStatsModule } from "./stats/stats.module";
import { PoolETCPaymentsModule } from "./payments/payments.module";
import { PoolETCMinersModule } from "./miners/miners.module";
import { PoolETCBlocksModule } from "./blocks/blocks.module";
import { PoolETCFindersModule } from "./finders/finers.module";
@Module({
  imports: [
    HttpModule,
    PoolETCStatsModule,
    PoolETCPaymentsModule,
    PoolETCMinersModule,
    PoolETCBlocksModule,
    PoolETCFindersModule
  ]
})
export class EtcPoolModule {}
