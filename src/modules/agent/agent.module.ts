import { Module } from '@nestjs/common';
import { AgentController } from './agent.controller';
import { AgentService } from './agent.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AgentSchema } from './schemas/agent.schema';
import { SharedModule } from '../shared/shared.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Agent', schema: AgentSchema }]),
    SharedModule,
  ],
  exports: [AgentService],
  controllers: [AgentController],
  providers: [AgentService],
})
export class AgentModule {}
