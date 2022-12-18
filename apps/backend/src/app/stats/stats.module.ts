import { Module } from '@nestjs/common';
import { HttpModule } from "@nestjs/axios";
import { StatsResolver } from "./stats.resolver";
import { StatsService } from "./stats.service";

@Module({
  imports: [HttpModule],
  providers: [StatsResolver, StatsService]
})
export class StatsModule {}
