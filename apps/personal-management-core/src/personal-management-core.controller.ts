import { Controller, Get } from '@nestjs/common';
import { PersonalManagementCoreService } from './personal-management-core.service';

@Controller()
export class PersonalManagementCoreController {
  constructor(
    private readonly personalManagementCoreService: PersonalManagementCoreService,
  ) {}

  @Get()
  getHello(): string {
    return this.personalManagementCoreService.getHello();
  }
}
