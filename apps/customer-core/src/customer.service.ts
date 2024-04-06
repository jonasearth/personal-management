import { CustomerEntity } from '@libs/entities';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { UpdateCustomerDto } from './dtos/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
  ) {}

  public async getCustomer(customerId: string): Promise<CustomerEntity> {
    const customer = await this.customerRepository.findOne({
      where: { customerId },
    });

    if (!customer) {
      Logger.error(`Customer not found: ${customerId}`);
      throw new NotFoundException('Customer not found!');
    }
    return customer;
  }

  public async listCustomers(
    page: number,
    limit: number,
  ): Promise<[CustomerEntity[], number]> {
    return this.customerRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });
  }
  public async getCustomerByEmail(email: string): Promise<CustomerEntity> {
    const customer = await this.customerRepository.findOne({
      where: { email },
    });

    if (!customer) {
      Logger.error(`Customer not found: ${email}`);
      throw new NotFoundException('Customer not found!');
    }
    return customer;
  }

  public async createCustomer(
    customer: CreateCustomerDto,
  ): Promise<CustomerEntity> {
    return this.customerRepository.save(customer);
  }

  public async updateCustomer(
    customerId: string,
    customer: UpdateCustomerDto,
  ): Promise<CustomerEntity> {
    const customerToUpdate = await this.getCustomer(customerId);
    return this.customerRepository.save({
      ...customerToUpdate,
      ...customer,
    });
  }

  public async deleteCustomer(customerId: string): Promise<void> {
    await this.customerRepository.softDelete({ customerId });
    return;
  }
}
