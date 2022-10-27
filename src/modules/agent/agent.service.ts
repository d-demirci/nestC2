import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import * as mongodb from 'mongodb';
import { InjectModel } from '@nestjs/mongoose';
import { Agent } from './interfaces/agent.interface';
import { CreateAgentDTO } from './dto/create-agent.dto';
import { UpdateAgentDTO } from './dto/update-agent.dto';
import { UniqueError } from '../shared/errors/unique-error.error';

@Injectable()
export class AgentService {
  constructor(
    @InjectModel('Agent') private readonly agentModel: Model<Agent>,
  ) {}

  // fetch all agents
  async getAllAgent(): Promise<Agent[]> {
    const agents = await this.agentModel.find().exec();
    return agents;
  }

  // Get a single agent
  async getAgent(agentID: string): Promise<Agent> {
    const agent = await this.agentModel.findOne({ agent_id: agentID }).exec();
    return agent;
  }

  // post a single agent
  async addAgent(createAgentDTO: CreateAgentDTO): Promise<Agent> {
    try {
      const newAgent = new this.agentModel(createAgentDTO);
      return newAgent.save();
    } catch (e) {
      if (e instanceof mongodb.MongoServerError && e.code === 11000) {
        throw new UniqueError('Agent already exist');
      }
      throw e;
    }
  }

  // Edit agent details
  async updateAgent(
    agentID: string,
    updateAgentDTO: UpdateAgentDTO,
  ): Promise<Agent> {
    const updatedAgent = await this.agentModel.findByIdAndUpdate(
      agentID,
      updateAgentDTO,
      { upsert: true },
    );
    return updatedAgent;
  }

  // Delete a agent
  async deleteAgent(agentID: string): Promise<any> {
    const deletedAgent = await this.agentModel.findByIdAndRemove(agentID);
    return deletedAgent;
  }

  async stats(): Promise<any> {
    return await this.agentModel.count({}).exec();
  }
}
