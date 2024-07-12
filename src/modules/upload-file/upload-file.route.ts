import { Router } from 'express';

import multerOptions from '@config/storage';
import Auth from '@middlewares/auth';
import multer from 'multer';
import Controller from './upload-file.controller';

const router = Router();

router
.route('/')
.post(
  Auth.isAuthenticated,
  multer(multerOptions).single('file'),
  Controller.upload,
);

export default router;
