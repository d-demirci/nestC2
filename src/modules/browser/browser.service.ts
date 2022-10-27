import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Browser } from './interfaces/browser.interface';
import { CreateBrowserDTO } from './dto/create-browser.dto';
import { UpdateBrowserDTO } from './dto/update-browser.dto';

@Injectable()
export class BrowserService {
  constructor(
    @InjectModel('Browser') private readonly browserModel: Model<Browser>,
  ) {}

  // fetch all browsers
  async getAllBrowser(): Promise<Browser[]> {
    const browsers = await this.browserModel.find().exec();
    return browsers;
  }

  // Get a single browser
  async getBrowser(browserID): Promise<Browser> {
    const browser = await this.browserModel.findById(browserID).exec();
    return browser;
  }
  async getBrowserByAgentID(agentID): Promise<Browser[]> {
    const browser = await this.browserModel.find({ agent_id: agentID }).exec();
    return browser;
  }

  // post a single browser
  async addBrowser(createBrowserDTO: CreateBrowserDTO): Promise<Browser> {
    const newBrowser = new this.browserModel(createBrowserDTO);
    return newBrowser.save();
  }

  // Edit browser details
  async updateBrowser(
    browserID,
    updateBrowserDTO: UpdateBrowserDTO,
  ): Promise<Browser> {
    const updatedBrowser = await this.browserModel.findByIdAndUpdate(
      browserID,
      updateBrowserDTO,
      { upsert: true },
    );
    return updatedBrowser;
  }

  // Delete a browser
  async deleteBrowser(browserID): Promise<any> {
    const deletedBrowser = await this.browserModel.findByIdAndRemove(browserID);
    return deletedBrowser;
  }
}
