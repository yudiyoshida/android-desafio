import { RequestProperyType } from '@customTypes/request';
import { NextFunction, Request, RequestHandler } from 'express';
import { z } from 'zod';

import AppException from '@errors/app-exception';

abstract class BaseValidator {
  protected readonly pathSchema;
  protected readonly querySchema;

  constructor() {
    this.pathSchema = z.object({
      id: z.coerce.number().positive().int(),
    });
    this.querySchema = z.object({
      limit: z.coerce.number().positive().int().optional(),
      page: z.coerce.number().positive().int().optional(),
    });
  }

  private zodValidation = <T extends z.ZodTypeAny>(schema: T, value: any) => {
    return schema.parse(value);
  };

  protected validateSchema(property: RequestProperyType, schema: z.ZodTypeAny, req: Request, next: NextFunction) {
    try {
      req[property] = this.zodValidation(schema, req[property]);
      next();

    } catch (err: any) {
      next(new AppException(400, err.issues));

    }
  }

  public pathParams: RequestHandler = async(req, res, next) => {
    this.validateSchema('params', this.pathSchema, req, next);
  };

  public queryParams: RequestHandler = async(req, res, next) => {
    this.validateSchema('query', this.querySchema, req, next);
  };
}

export default BaseValidator;
