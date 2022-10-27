import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Call } from './interfaces/call.interface';
import { CreateCallDTO } from './dto/create-call.dto';
import { UpdateCallDTO } from './dto/update-call.dto';

@Injectable()
export class CallService {
  constructor(@InjectModel('Call') private readonly callModel: Model<Call>) {}

  // fetch all calls
  async getAllCall(): Promise<Call[]> {
    const calls = await this.callModel.find().exec();
    return calls;
  }

  // Get a single call
  async getCall(callID): Promise<Call> {
    const call = await this.callModel.findById(callID).exec();
    return call;
  }
  async getCallByAgentID(agentID): Promise<Call[]> {
    const call = await this.callModel.find({ agent_id: agentID }).exec();
    return call;
  }

  // post a single call
  async addCall(createCallDTO: CreateCallDTO): Promise<Call> {
    const newCall = new this.callModel(createCallDTO);
    return newCall.save();
  }

  // Edit call details
  async updateCall(callID, updateCallDTO: UpdateCallDTO): Promise<Call> {
    const updatedCall = await this.callModel.findByIdAndUpdate(
      callID,
      updateCallDTO,
      { upsert: true },
    );
    return updatedCall;
  }

  // Delete a call
  async deleteCall(callID): Promise<any> {
    const deletedCall = await this.callModel.findByIdAndRemove(callID);
    return deletedCall;
  }
}
