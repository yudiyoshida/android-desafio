import { Router } from 'express';

import Controller from './user.controller';
import Validator from './user.validator';

const router = Router();

router
.route('/account/create')
.post(
  Validator.createOne,
  Controller.createOne,
);

export default router;
