import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

describe('CustomerCoreController', () => {
  let customerCoreController: CustomerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [CustomerService],
    }).compile();

    customerCoreController = app.get<CustomerController>(CustomerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(customerCoreController.getHello()).toBe('Hello World!');
    });
  });
});
