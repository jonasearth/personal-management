import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { CustomerEntity } from '@libs/entities';
import { IPagination, Paginate, PaginatedApiResponse } from '@libs/decorators';
import { UpdateCustomerDto } from './dtos/update-customer.dto';
import { PaginatedResponseDto } from '@libs/dtos';

@ApiTags('Customer')
@Controller({
  path: 'customers',
  version: '1',
})
export class CustomerController {
  constructor(private readonly customerCoreService: CustomerService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ type: CustomerEntity, status: 201 })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Unprocessable Entity',
    status: HttpStatus.UNPROCESSABLE_ENTITY,
  })
  public async createCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerEntity> {
    return this.customerCoreService.createCustomer(createCustomerDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @PaginatedApiResponse(CustomerEntity, {
    description: 'List of customers',
    status: HttpStatus.OK,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    status: HttpStatus.BAD_REQUEST,
  })
  public async listCustomers(
    @Paginate() pagination: IPagination,
  ): Promise<PaginatedResponseDto<CustomerEntity>> {
    const [customers, itemCount] = await this.customerCoreService.listCustomers(
      pagination.page,
      pagination.limit,
    );
    const pageCount = Math.ceil(itemCount / pagination.limit);

    return {
      items: customers,
      meta: {
        currentPage: pagination.page,
        take: customers.length,
        itemCount,
        pageCount,
        hasPreviousPage: pagination.page > 1,
        hasNextPage: pagination.page < pageCount,
      },
    };
  }

  @Get(':customerId')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: CustomerEntity, status: 200 })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiNotFoundResponse({
    description: 'Customer not found!',
    status: HttpStatus.NOT_FOUND,
  })
  public async getCustomer(customerId: string): Promise<CustomerEntity> {
    return this.customerCoreService.getCustomer(customerId);
  }

  @Get('find-by-email/:email')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: CustomerEntity, status: 200 })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiNotFoundResponse({
    description: 'Customer not found!',
    status: HttpStatus.NOT_FOUND,
  })
  public async getCustomerByEmail(
    @Param('email') email: string,
  ): Promise<CustomerEntity> {
    return this.customerCoreService.getCustomerByEmail(email);
  }

  @Patch(':customerId')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: CustomerEntity, status: 200 })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiNotFoundResponse({
    description: 'Customer not found!',
    status: HttpStatus.NOT_FOUND,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Unprocessable Entity',
    status: HttpStatus.UNPROCESSABLE_ENTITY,
  })
  public async updateCustomer(
    @Param('customerId') customerId: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<CustomerEntity> {
    return this.customerCoreService.updateCustomer(
      customerId,
      updateCustomerDto,
    );
  }

  @Delete(':customerId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBadRequestResponse({
    description: 'Bad Request',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiNotFoundResponse({
    description: 'Customer not found!',
    status: HttpStatus.NOT_FOUND,
  })
  @ApiResponse({ status: 200 })
  public async deleteCustomer(
    @Param('customerId') customerId: string,
  ): Promise<void> {
    return this.customerCoreService.deleteCustomer(customerId);
  }
}
