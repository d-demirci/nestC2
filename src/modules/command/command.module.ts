import { Module } from '@nestjs/common';
import { CommandController } from './command.controller';
import { CommandService } from './command.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandSchema } from './schemas/command.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Command', schema: CommandSchema }]),
  ],
  controllers: [CommandController],
  providers: [CommandService],
})
export class CommandModule {}
