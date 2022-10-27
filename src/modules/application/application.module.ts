import { Module } from '@nestjs/common';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicationSchema } from './schemas/application.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Application', schema: ApplicationSchema },
    ]),
  ],
  exports: [ApplicationService],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
