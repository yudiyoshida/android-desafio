import { Router } from 'express';

import Auth from '@middlewares/auth';
import Controller from './book.controller';
import Validator from './book.validator';

const router = Router();

router
.route('/')
.all(
  Auth.isAuthenticated,
)
.get(
  Validator.queryParams,
  Controller.findAll,
)
.post(
  Validator.createOne,
  Controller.createOne,
);

router
.route('/:id')
.all(
  Auth.isAuthenticated,
)
.get(
  Validator.pathParams,
  Controller.findOne,
);

export default router;
