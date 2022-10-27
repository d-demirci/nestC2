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
import { ApplicationService } from './application.service';
import { CreateApplicationDTO } from './dto/create-application.dto';
import { UpdateApplicationDTO } from './dto/update-application.dto';

@Controller('application')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  // add a application
  @Post()
  async addApplication(
    @Res() res,
    @Body() createApplicationDTO: CreateApplicationDTO,
  ) {
    try {
      const application = await this.applicationService.addApplication(
        createApplicationDTO,
      );
      res.status(HttpStatus.OK).json({
        message: 'Application has been created successfully',
        application,
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

  // Retrieve applications list by agentID
  @Get('/agent/:agentID')
  async getAllApplication(@Res() res, @Param('agentID') agentID) {
    const applications = await this.applicationService.getApplicationByAgentID(
      agentID,
    );
    console.log(`Application list for agent with ID ${agentID} is available`);
    return res.status(HttpStatus.OK).json(applications);
  }

  // Fetch a particular application using ID
  @Get(':applicationID')
  async getApplication(@Res() res, @Param('applicationID') applicationID) {
    const application = await this.applicationService.getApplication(
      applicationID,
    );
    if (!application)
      throw new NotFoundException('Application does not exist!');
    return res.status(HttpStatus.OK).json(application);
  }

  // Update a particular application's details
  @Put(':applicationID')
  async updateApplication(
    @Res() res,
    @Param('applicationID') applicationID,
    @Body() updateApplicationDTO: UpdateApplicationDTO,
  ) {
    const application = await this.applicationService.updateApplication(
      applicationID,
      updateApplicationDTO,
    );
    if (!application)
      throw new NotFoundException('Application does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Application has been successfully updated',
      application,
    });
  }

  // Delete a particular application
  @Delete(':applicationID')
  async deleteApplication(@Res() res, @Param('applicationID') applicationID) {
    const application = await this.applicationService.deleteApplication(
      applicationID,
    );
    if (!application) throw new NotFoundException('Application does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Application has been deleted',
      application,
    });
  }
}
