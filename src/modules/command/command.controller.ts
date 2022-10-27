import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  NotFoundException,
  Delete,
  Param,
} from '@nestjs/common';
import { CommandService } from './command.service';
import { CreateCommandDTO } from './dto/create-command.dto';
import { UpdateCommandDTO } from './dto/update-command.dto';

@Controller('command')
export class CommandController {
  constructor(private commandService: CommandService) {}

  // add a command
  @Post('')
  async addCommand(@Res() res, @Body() createCommandDTO: CreateCommandDTO) {
    try {
      const command = await this.commandService.addCommand(createCommandDTO);
      res.status(HttpStatus.OK).json({
        message: 'Command has been created successfully',
        command,
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        const errors = {};

        Object.keys(error.errors).forEach((key) => {
          errors[key] = error.errors[key].message;
        });

        res.status(HttpStatus.BAD_REQUEST).json({
          message: errors,
        });
      }
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Something went wrong',
      });
    }
  }

  // Retrieve commands list by agentID
  @Get('/agent/:agentID')
  async getAllCommand(@Res() res, @Param('agentID') agentID) {
    const commands = await this.commandService.getCommandByAgentID(agentID);
    return res.status(HttpStatus.OK).json(commands);
  }

  // Fetch a particular command using ID
  @Get(':commandID')
  async getCommand(@Res() res, @Param('commandID') commandID) {
    const command = await this.commandService.getCommand(commandID);
    if (!command) throw new NotFoundException('Command does not exist!');
    return res.status(HttpStatus.OK).json(command);
  }

  // Update a particular command's details
  @Put(':commandID')
  async updateCommand(
    @Res() res,
    @Param('commandID') commandID,
    @Body() updateCommandDTO: UpdateCommandDTO,
  ) {
    const command = await this.commandService.updateCommand(
      commandID,
      updateCommandDTO,
    );
    if (!command) throw new NotFoundException('Command does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Command has been successfully updated',
      command,
    });
  }

  // Delete a particular command
  @Delete(':commandID')
  async deleteCommand(@Res() res, @Param('commandID') commandID) {
    const command = await this.commandService.deleteCommand(commandID);
    if (!command) throw new NotFoundException('Command does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Command has been deleted',
      command,
    });
  }
}
