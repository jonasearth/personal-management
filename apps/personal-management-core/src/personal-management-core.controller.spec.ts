import { Test, TestingModule } from '@nestjs/testing';
import { PersonalManagementCoreController } from './personal-management-core.controller';
import { PersonalManagementCoreService } from './personal-management-core.service';

describe('PersonalManagementCoreController', () => {
  let personalManagementCoreController: PersonalManagementCoreController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PersonalManagementCoreController],
      providers: [PersonalManagementCoreService],
    }).compile();

    personalManagementCoreController =
      app.get<PersonalManagementCoreController>(
        PersonalManagementCoreController,
      );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(personalManagementCoreController.getHello()).toBe('Hello World!');
    });
  });
});
