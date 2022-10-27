import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Command } from './interfaces/command.interface';
import { CreateCommandDTO } from './dto/create-command.dto';
import { UpdateCommandDTO } from './dto/update-command.dto';

@Injectable()
export class CommandService {
  constructor(
    @InjectModel('Command') private readonly commandModel: Model<Command>,
  ) {}

  // fetch all commands
  async getAllCommand(): Promise<Command[]> {
    const commands = await this.commandModel.find().exec();
    return commands;
  }

  // Get a single command
  async getCommand(commandID): Promise<Command> {
    const command = await this.commandModel.findById(commandID).exec();
    return command;
  }
  async getCommandByAgentID(agentID): Promise<Command[]> {
    const command = await this.commandModel
      .find({ agent_id: agentID, status: 'WAITING' })
      .exec();
    return command;
  }

  // post a single command
  async addCommand(createCommandDTO: CreateCommandDTO): Promise<Command> {
    const newCommand = new this.commandModel(createCommandDTO);
    return newCommand.save();
  }

  // Edit command details
  async updateCommand(
    commandID,
    updateCommandDTO: UpdateCommandDTO,
  ): Promise<Command> {
    const updatedCommand = await this.commandModel.findByIdAndUpdate(
      commandID,
      updateCommandDTO,
      { upsert: true },
    );
    return updatedCommand;
  }

  // Delete a command
  async deleteCommand(commandID): Promise<any> {
    const deletedCommand = await this.commandModel.findByIdAndRemove(commandID);
    return deletedCommand;
  }
}
