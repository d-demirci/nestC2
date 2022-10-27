import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Location } from './interfaces/location.interface';
import { CreateLocationDTO } from './dto/create-location.dto';
import { UpdateLocationDTO } from './dto/update-location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel('Location') private readonly locationModel: Model<Location>,
  ) {}

  // fetch all locations
  async getAllLocation(): Promise<Location[]> {
    const locations = await this.locationModel.find().exec();
    return locations;
  }

  // Get a single location
  async getLocation(locationID): Promise<Location> {
    const location = await this.locationModel.findById(locationID).exec();
    return location;
  }
  async getLocationByAgentID(agentID): Promise<Location[]> {
    const location = await this.locationModel
      .find({ agent_id: agentID })
      .exec();
    return location;
  }

  // post a single location
  async addLocation(createLocationDTO: CreateLocationDTO): Promise<Location> {
    const newLocation = new this.locationModel(createLocationDTO);
    return newLocation.save();
  }

  // Edit location details
  async updateLocation(
    locationID,
    updateLocationDTO: UpdateLocationDTO,
  ): Promise<Location> {
    const updatedLocation = await this.locationModel.findByIdAndUpdate(
      locationID,
      updateLocationDTO,
      { upsert: true },
    );
    return updatedLocation;
  }

  // Delete a location
  async deleteLocation(locationID): Promise<any> {
    const deletedLocation = await this.locationModel.findByIdAndRemove(
      locationID,
    );
    return deletedLocation;
  }
}
