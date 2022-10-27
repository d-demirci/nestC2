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
import { ContactService } from './contact.service';
import { CreateContactDTO } from './dto/create-contact.dto';
import { UpdateContactDTO } from './dto/update-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private contactService: ContactService) {}

  // add a contact
  @Post('')
  async addContact(@Res() res, @Body() createContactDTO: CreateContactDTO) {
    try {
      const contact = await this.contactService.addContact(createContactDTO);
      res.status(HttpStatus.OK).json({
        message: 'Contact has been created successfully',
        contact,
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

  // Retrieve contacts list by agentID
  @Get('/agent/:agentID')
  async getAllContact(@Res() res, @Param('agentID') agentID) {
    const contacts = await this.contactService.getContactByAgentID(agentID);
    return res.status(HttpStatus.OK).json(contacts);
  }

  // Fetch a particular contact using ID
  @Get(':contactID')
  async getContact(@Res() res, @Param('contactID') contactID) {
    const contact = await this.contactService.getContact(contactID);
    if (!contact) throw new NotFoundException('Contact does not exist!');
    return res.status(HttpStatus.OK).json(contact);
  }

  // Update a particular contact's details
  @Put(':contactID')
  async updateContact(
    @Res() res,
    @Param('contactID') contactID,
    @Body() updateContactDTO: UpdateContactDTO,
  ) {
    const contact = await this.contactService.updateContact(
      contactID,
      updateContactDTO,
    );
    if (!contact) throw new NotFoundException('Contact does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Contact has been successfully updated',
      contact,
    });
  }

  // Delete a particular contact
  @Delete(':contactID')
  async deleteContact(@Res() res, @Param('contactID') contactID) {
    const contact = await this.contactService.deleteContact(contactID);
    if (!contact) throw new NotFoundException('Contact does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Contact has been deleted',
      contact,
    });
  }
}
