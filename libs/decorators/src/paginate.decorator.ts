import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export interface IPagination {
  page: number;
  limit: number;
}

export const Paginate = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const req: Record<string, any> = context.switchToHttp().getRequest();
    const { page, limit } = req.query as IPagination;

    return {
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 10,
    };
  },
  [
    (target: object, key: string | symbol | undefined) => {
      ApiQuery({
        name: 'page',
        schema: { default: 1, type: 'number', minimum: 1 },
        required: false,
      })(
        target,
        key as string,
        Object.getOwnPropertyDescriptor(
          target,
          key as string,
        ) as PropertyDescriptor,
      );
      ApiQuery({
        name: 'limit',
        schema: { default: 10, type: 'number', minimum: 1 },
        required: false,
      })(
        target,
        key as string,
        Object.getOwnPropertyDescriptor(
          target,
          key as string,
        ) as PropertyDescriptor,
      );
    },
  ],
);
