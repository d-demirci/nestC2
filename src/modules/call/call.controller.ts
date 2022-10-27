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
import { CallService } from './call.service';
import { CreateCallDTO } from './dto/create-call.dto';
import { UpdateCallDTO } from './dto/update-call.dto';

@Controller('call')
export class CallController {
  constructor(private callService: CallService) {}

  // add a call
  @Post()
  async addCall(@Res() res, @Body() createCallDTO: CreateCallDTO) {
    try {
      const call = await this.callService.addCall(createCallDTO);
      res.status(HttpStatus.OK).json({
        message: 'Call has been created successfully',
        call,
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

  // Retrieve calls list by agentID
  @Get('/agent/:agentID')
  async getAllCall(@Res() res, @Param('agentID') agentID) {
    const calls = await this.callService.getCallByAgentID(agentID);
    return res.status(HttpStatus.OK).json(calls);
  }

  // Fetch a particular call using ID
  @Get(':callID')
  async getCall(@Res() res, @Param('callID') callID) {
    const call = await this.callService.getCall(callID);
    if (!call) throw new NotFoundException('Call does not exist!');
    return res.status(HttpStatus.OK).json(call);
  }

  // Update a particular call's details
  @Put(':callID')
  async updateCall(
    @Res() res,
    @Param('callID') callID,
    @Body() updateCallDTO: UpdateCallDTO,
  ) {
    const call = await this.callService.updateCall(callID, updateCallDTO);
    if (!call) throw new NotFoundException('Call does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Call has been successfully updated',
      call,
    });
  }

  // Delete a particular call
  @Delete(':callID')
  async deleteCall(@Res() res, @Param('callID') callID) {
    const call = await this.callService.deleteCall(callID);
    if (!call) throw new NotFoundException('Call does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Call has been deleted',
      call,
    });
  }
}
