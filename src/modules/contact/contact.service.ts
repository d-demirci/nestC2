import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Contact } from './interfaces/contact.interface';
import { CreateContactDTO } from './dto/create-contact.dto';
import { UpdateContactDTO } from './dto/update-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel('Contact') private readonly contactModel: Model<Contact>,
  ) {}

  // fetch all contacts
  async getAllContact(): Promise<Contact[]> {
    const contacts = await this.contactModel.find().exec();
    return contacts;
  }

  // Get a single contact
  async getContact(contactID): Promise<Contact> {
    const contact = await this.contactModel.findById(contactID).exec();
    return contact;
  }
  async getContactByAgentID(agentID): Promise<Contact[]> {
    const contact = await this.contactModel.find({ agent_id: agentID }).exec();
    return contact;
  }

  // post a single contact
  async addContact(createContactDTO: CreateContactDTO): Promise<Contact> {
    const newContact = new this.contactModel(createContactDTO);
    return newContact.save();
  }

  // Edit contact details
  async updateContact(
    contactID,
    updateContactDTO: UpdateContactDTO,
  ): Promise<Contact> {
    const updatedContact = await this.contactModel.findByIdAndUpdate(
      contactID,
      updateContactDTO,
      { upsert: true },
    );
    return updatedContact;
  }

  // Delete a contact
  async deleteContact(contactID): Promise<any> {
    const deletedContact = await this.contactModel.findByIdAndRemove(contactID);
    return deletedContact;
  }
  async stats(): Promise<any> {
    return await this.contactModel.count({}).exec();
  }
}
