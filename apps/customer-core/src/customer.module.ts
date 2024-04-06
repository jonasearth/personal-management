import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from '@libs/database';

@Module({
  imports: [TypeOrmModule.forRoot(dataSource)],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
