import { CustomerModuleEnum, CustomerRoleEnum } from '@libs/enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export class CustomerSettings {
  @ApiProperty({ enum: CustomerRoleEnum, isArray: true })
  @IsEnum(CustomerRoleEnum, { each: true })
  roles: CustomerRoleEnum[];

  @ApiProperty({ enum: CustomerModuleEnum, isArray: true })
  @IsEnum(CustomerModuleEnum, { each: true })
  modules: CustomerModuleEnum[];
}
