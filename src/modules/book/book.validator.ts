import BaseValidator from '@abstracts/validator';
import { RequestHandler } from 'express';
import { z } from 'zod';
import { CreateBook } from './dtos/create-book.dto';
import { UpdateBook } from './dtos/update-book.dto';

class Validator extends BaseValidator {
  constructor() {
    super();
  }

  public createOne: RequestHandler = async(req, res, next) => {
    this.validateSchema('body', CreateBook, req, next);
  };

  public updateOne: RequestHandler = async(req, res, next) => {
    this.validateSchema('body', UpdateBook, req, next);
  };

  public queryParams: RequestHandler = async(req, res, next) => {
    const schema = this.querySchema.extend({
      categoryId: z.coerce.number().positive().int().optional(),
      search: z.string().trim().optional(),
    });

    this.validateSchema('query', schema, req, next);
  };
}

export default new Validator();
