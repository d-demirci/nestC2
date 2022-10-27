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
import { LocationService } from './location.service';
import { CreateLocationDTO } from './dto/create-location.dto';
import { UpdateLocationDTO } from './dto/update-location.dto';

@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}

  // add a location
  @Post()
  async addLocation(@Res() res, @Body() createLocationDTO: CreateLocationDTO) {
    try {
      const location = await this.locationService.addLocation(
        createLocationDTO,
      );
      res.status(HttpStatus.OK).json({
        message: 'Location has been created successfully',
        location,
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

  // Retrieve locations list by agentID
  @Get('/agent/:agentID')
  async getAllLocation(@Res() res, @Param('agentID') agentID) {
    const locations = await this.locationService.getLocationByAgentID(agentID);
    return res.status(HttpStatus.OK).json(locations);
  }

  // Fetch a particular location using ID
  @Get(':locationID')
  async getLocation(@Res() res, @Param('locationID') locationID) {
    const location = await this.locationService.getLocation(locationID);
    if (!location) throw new NotFoundException('Location does not exist!');
    return res.status(HttpStatus.OK).json(location);
  }

  // Update a particular location's details
  @Put(':locationID')
  async updateLocation(
    @Res() res,
    @Param('locationID') locationID,
    @Body() updateLocationDTO: UpdateLocationDTO,
  ) {
    const location = await this.locationService.updateLocation(
      locationID,
      updateLocationDTO,
    );
    if (!location) throw new NotFoundException('Location does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Location has been successfully updated',
      location,
    });
  }

  // Delete a particular location
  @Delete(':locationID')
  async deleteLocation(@Res() res, @Param('locationID') locationID) {
    const location = await this.locationService.deleteLocation(locationID);
    if (!location) throw new NotFoundException('Location does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Location has been deleted',
      location,
    });
  }
}
