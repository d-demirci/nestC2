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
import { UniqueError } from '../shared/errors/unique-error.error';
import { AgentService } from './agent.service';
import { CreateAgentDTO } from './dto/create-agent.dto';
import { UpdateAgentDTO } from './dto/update-agent.dto';

@Controller('agent')
export class AgentController {
  constructor(private agentService: AgentService) {}

  // add a agent
  @Post()
  async addAgent(@Res() res, @Body() createAgentDTO: CreateAgentDTO) {
    try {
      const agent = await this.agentService.addAgent(createAgentDTO);
      return res.status(HttpStatus.OK).json({
        message: 'Agent has been created successfully',
        agent,
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
      if (error instanceof UniqueError) {
        return res.status(HttpStatus.CONFLICT).json({ message: error.message });
      }

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Something went wrong',
      });
    }
  }

  // Retrieve agents list
  @Get('agents')
  async getAllAgent(@Res() res) {
    const agents = await this.agentService.getAllAgent();
    console.log(agents);
    return res.status(HttpStatus.OK).json(agents);
  }

  // Fetch a particular agent using ID
  @Get(':agentID')
  async getAgent(@Res() res, @Param('agentID') agentID) {
    const agent = await this.agentService.getAgent(agentID);
    console.log(agent);
    if (!agent) throw new NotFoundException('Agent does not exist!');
    return res.status(HttpStatus.OK).json(agent);
  }

  // Update a agent's details
  @Put(':agentID')
  async updateAgent(
    @Res() res,
    @Param('agentID') agentID,
    @Body() updateAgentDTO: UpdateAgentDTO,
  ) {
    const agent = await this.agentService.updateAgent(agentID, updateAgentDTO);
    if (!agent) throw new NotFoundException('Agent does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Agent has been successfully updated',
      agent,
    });
  }

  // Delete a agent
  @Delete(':agentID')
  async deleteAgent(@Res() res, @Param('agentID') agentID) {
    const agent = await this.agentService.deleteAgent(agentID);
    if (!agent) throw new NotFoundException('Agent does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Agent has been deleted',
      agent,
    });
  }
}
