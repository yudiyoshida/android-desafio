import BaseValidator from '@abstracts/validator';
import { RequestHandler } from 'express';
import { Login } from './dtos/login.dto';

class Validator extends BaseValidator {
  constructor() {
    super();
  }

  public login: RequestHandler = async(req, res, next) => {
    this.validateSchema('body', Login, req, next);
  };
}

export default new Validator();
