import { Module } from '@nestjs/common';
import { SmsController } from './sms.controller';
import { SmsService } from './sms.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SmsSchema } from './schemas/sms.schema';
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Sms', schema: SmsSchema }])],
  controllers: [SmsController],
  providers: [SmsService],
})
export class SmsModule {}
