import { Router } from 'express';

import multerOptions from '@config/storage';
import multer from 'multer';
import Controller from './upload-file.controller';

const router = Router();

router
.route('/')
.post(
  multer(multerOptions).single('file'),
  Controller.upload,
);

export default router;
