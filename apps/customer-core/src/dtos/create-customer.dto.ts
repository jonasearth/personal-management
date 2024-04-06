import { CustomerSettings } from '@libs/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsObject, IsStrongPassword } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @ApiProperty({ type: CustomerSettings })
  @IsObject()
  settings: CustomerSettings;
}
