import { Injectable } from '@nestjs/common';

@Injectable()
export class PersonalManagementCoreService {
  getHello(): string {
    return 'Hello World!';
  }
}
