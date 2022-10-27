import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Sms } from './interfaces/sms.interface';
import { CreateSmsDTO } from './dto/create-sms.dto';
import { UpdateSmsDTO } from './dto/update-sms.dto';

@Injectable()
export class SmsService {
  constructor(@InjectModel('Sms') private readonly smsModel: Model<Sms>) {}

  // fetch all smss
  async getAllSms(): Promise<Sms[]> {
    const smss = await this.smsModel.find().exec();
    return smss;
  }

  // Get a single sms
  async getSms(smsID): Promise<Sms> {
    const sms = await this.smsModel.findById(smsID).exec();
    return sms;
  }
  async getSmsByAgentID(agentID): Promise<Sms[]> {
    const sms = await this.smsModel.find({ agent_id: agentID }).exec();
    return sms;
  }

  // post a single sms
  async addSms(createSmsDTO: CreateSmsDTO): Promise<Sms> {
    const newSms = new this.smsModel(createSmsDTO);
    return newSms.save();
  }

  // Edit sms details
  async updateSms(smsID, updateSmsDTO: UpdateSmsDTO): Promise<Sms> {
    const updatedSms = await this.smsModel.findByIdAndUpdate(
      smsID,
      updateSmsDTO,
      { upsert: true },
    );
    return updatedSms;
  }

  // Delete a sms
  async deleteSms(smsID): Promise<any> {
    const deletedSms = await this.smsModel.findByIdAndRemove(smsID);
    return deletedSms;
  }
}
