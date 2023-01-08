import { Module } from "@nestjs/common";
import { EtcPoolModule } from "./etc-pool/etc-pool.module";

@Module({
  imports: [
    EtcPoolModule
  ]
})
export class PoolsModule {}
