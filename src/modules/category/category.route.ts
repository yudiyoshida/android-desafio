import { Router } from 'express';

import Auth from '@middlewares/auth';
import Controller from './category.controller';
import Validator from './category.validator';

const router = Router();

router
.route('/')
.all(
  Auth.isAuthenticated,
)
.get(
  Validator.queryParams,
  Controller.findAll,
);

export default router;
