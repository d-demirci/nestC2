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
import { SmsService } from './sms.service';
import { CreateSmsDTO } from './dto/create-sms.dto';
import { UpdateSmsDTO } from './dto/update-sms.dto';

@Controller('sms')
export class SmsController {
  constructor(private smsService: SmsService) {}

  // add a sms
  @Post('')
  async addSms(@Res() res, @Body() createSmsDTO: CreateSmsDTO) {
    try {
      const sms = await this.smsService.addSms(createSmsDTO);
      res.status(HttpStatus.OK).json({
        message: 'Sms has been created successfully',
        sms,
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

  // Retrieve smss list by agentID
  @Get('/agent/:agentID')
  async getAllSms(@Res() res, @Param('agentID') agentID) {
    const smss = await this.smsService.getSmsByAgentID(agentID);
    return res.status(HttpStatus.OK).json(smss);
  }

  // Fetch a particular sms using ID
  @Get(':smsID')
  async getSms(@Res() res, @Param('smsID') smsID) {
    const sms = await this.smsService.getSms(smsID);
    if (!sms) throw new NotFoundException('Sms does not exist!');
    return res.status(HttpStatus.OK).json(sms);
  }

  // Update a particular sms's details
  @Put(':smsID')
  async updateSms(
    @Res() res,
    @Param('smsID') smsID,
    @Body() updateSmsDTO: UpdateSmsDTO,
  ) {
    const sms = await this.smsService.updateSms(smsID, updateSmsDTO);
    if (!sms) throw new NotFoundException('Sms does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Sms has been successfully updated',
      sms,
    });
  }

  // Delete a particular sms
  @Delete(':smsID')
  async deleteSms(@Res() res, @Param('smsID') smsID) {
    const sms = await this.smsService.deleteSms(smsID);
    if (!sms) throw new NotFoundException('Sms does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Sms has been deleted',
      sms,
    });
  }
}
