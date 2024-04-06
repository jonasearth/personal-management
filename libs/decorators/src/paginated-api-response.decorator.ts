import { PaginatedResponseDto } from '@libs/dtos';
import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiResponse,
  ApiResponseOptions,
  getSchemaPath,
} from '@nestjs/swagger';

export const PaginatedApiResponse = <TModel extends Type<unknown>>(
  model: TModel,
  options: ApiResponseOptions,
) => {
  return applyDecorators(
    ApiExtraModels(PaginatedResponseDto, model),
    ApiResponse({
      schema: {
        allOf: [
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
          { $ref: getSchemaPath(PaginatedResponseDto) },
        ],
      },
      ...options,
    }),
  );
};
