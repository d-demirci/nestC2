import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AgentModule } from './modules/agent/agent.module';
import { SmsModule } from './modules/sms/sms.module';
import { ContactModule } from './modules/contact/contact.module';
import { CommandModule } from './modules/command/command.module';
import { BrowserModule } from './modules/browser/browser.module';
import { CallModule } from './modules/call/call.module';
import { LocationModule } from './modules/location/location.module';
import { ApplicationModule } from './modules/application/application.module';
import { SharedModule } from './modules/shared/shared.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27018/nestc2', {
      useNewUrlParser: true,
    }),
    SharedModule,
    AgentModule,
    SmsModule,
    ContactModule,
    CommandModule,
    BrowserModule,
    CallModule,
    LocationModule,
    ApplicationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
