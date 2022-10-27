import { Controller, Get } from '@nestjs/common';
import { get } from 'http';
import { AppService } from './app.service';
import { AgentService } from './modules/agent/agent.service';
import { ApplicationService } from './modules/application/application.service';
import { ContactService } from './modules/contact/contact.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly applicationService: ApplicationService,
    private readonly agentService: AgentService,
    private readonly contactService: ContactService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('dashboard/stats')
  async getStats(): Promise<any> {
    const applications = await this.applicationService.stats();
    const agents = await this.agentService.stats();
    const contacts = await this.contactService.stats();
    return [
      { text: 'agents', value: agents, color: 'danger' },
      { text: 'applications', value: applications, color: 'success' },
      { text: 'contacts', value: contacts, color: 'info' },
    ];
  }
}
