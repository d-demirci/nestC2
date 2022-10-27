import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Application } from './interfaces/application.interface';
import { CreateApplicationDTO } from './dto/create-application.dto';
import { UpdateApplicationDTO } from './dto/update-application.dto';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel('Application')
    private readonly applicationModel: Model<Application>,
  ) {}

  // fetch all applications
  async getAllApplication(): Promise<Application[]> {
    const applications = await this.applicationModel.find().exec();
    return applications;
  }

  // Get a single application
  async getApplication(applicationID): Promise<Application> {
    const application = await this.applicationModel
      .findById(applicationID)
      .exec();
    return application;
  }
  async getApplicationByAgentID(agentID): Promise<Application[]> {
    const application = await this.applicationModel
      .find({ agent_id: agentID })
      .exec();
    return application;
  }

  // post a single application
  async addApplication(
    createApplicationDTO: CreateApplicationDTO,
  ): Promise<Application> {
    const newApplication = new this.applicationModel(createApplicationDTO);
    return newApplication.save();
  }

  // Edit application details
  async updateApplication(
    applicationID,
    updateApplicationDTO: UpdateApplicationDTO,
  ): Promise<Application> {
    const updatedApplication = await this.applicationModel.findByIdAndUpdate(
      applicationID,
      updateApplicationDTO,
      { upsert: true },
    );
    return updatedApplication;
  }

  // Delete a application
  async deleteApplication(applicationID): Promise<any> {
    const deletedApplication = await this.applicationModel.findByIdAndRemove(
      applicationID,
    );
    return deletedApplication;
  }

  async stats(): Promise<any> {
    return await this.applicationModel.count({}).exec();
  }
}
