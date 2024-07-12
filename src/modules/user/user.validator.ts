import BaseValidator from '@abstracts/validator';
import { RequestHandler } from 'express';
import { CreateUser } from './dtos/create-user.dto';

class Validator extends BaseValidator {
  constructor() {
    super();
  }
  
  public createOne: RequestHandler = async(req, res, next) => {
    this.validateSchema('body', CreateUser, req, next);
  };
}

export default new Validator();
