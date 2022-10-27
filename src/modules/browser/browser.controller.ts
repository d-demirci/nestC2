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
import { BrowserService } from './browser.service';
import { CreateBrowserDTO } from './dto/create-browser.dto';
import { UpdateBrowserDTO } from './dto/update-browser.dto';

@Controller('browser')
export class BrowserController {
  constructor(private browserService: BrowserService) {}

  // add a browser
  @Post()
  async addBrowser(@Res() res, @Body() createBrowserDTO: CreateBrowserDTO) {
    try {
      const browser = await this.browserService.addBrowser(createBrowserDTO);
      res.status(HttpStatus.OK).json({
        message: 'Browser has been created successfully',
        browser,
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

  // Retrieve browsers list by agentID
  @Get('/agent/:agentID')
  async getAllBrowser(@Res() res, @Param('agentID') agentID) {
    const browsers = await this.browserService.getBrowserByAgentID(agentID);
    return res.status(HttpStatus.OK).json(browsers);
  }

  // Fetch a particular browser using ID
  @Get(':browserID')
  async getBrowser(@Res() res, @Param('browserID') browserID) {
    const browser = await this.browserService.getBrowser(browserID);
    if (!browser) throw new NotFoundException('Browser does not exist!');
    return res.status(HttpStatus.OK).json(browser);
  }

  // Update a particular browser's details
  @Put(':browserID')
  async updateBrowser(
    @Res() res,
    @Param('browserID') browserID,
    @Body() updateBrowserDTO: UpdateBrowserDTO,
  ) {
    const browser = await this.browserService.updateBrowser(
      browserID,
      updateBrowserDTO,
    );
    if (!browser) throw new NotFoundException('Browser does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Browser has been successfully updated',
      browser,
    });
  }

  // Delete a particular browser
  @Delete(':browserID')
  async deleteBrowser(@Res() res, @Param('browserID') browserID) {
    const browser = await this.browserService.deleteBrowser(browserID);
    if (!browser) throw new NotFoundException('Browser does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Browser has been deleted',
      browser,
    });
  }
}
