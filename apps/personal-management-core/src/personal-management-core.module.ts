import { Module } from '@nestjs/common';
import { PersonalManagementCoreController } from './personal-management-core.controller';
import { PersonalManagementCoreService } from './personal-management-core.service';

@Module({
  imports: [],
  controllers: [PersonalManagementCoreController],
  providers: [PersonalManagementCoreService],
})
export class PersonalManagementCoreModule {}
