import { Module } from '@nestjs/common';
import { CallController } from './call.controller';
import { CallService } from './call.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CallSchema } from './schemas/call.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Call', schema: CallSchema }])],
  controllers: [CallController],
  providers: [CallService],
})
export class CallModule {}
