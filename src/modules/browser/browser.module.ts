import { Module } from '@nestjs/common';
import { BrowserController } from './browser.controller';
import { BrowserService } from './browser.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BrowserSchema } from './schemas/browser.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Browser', schema: BrowserSchema }]),
  ],
  controllers: [BrowserController],
  providers: [BrowserService],
})
export class BrowserModule {}
