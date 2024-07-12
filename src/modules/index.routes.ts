import { Router } from 'express';

import AuthRoutes from './auth/auth.route';
import BookRoutes from './book/book.route';
import CategoryRoutes from './category/category.route';
import UploadFileRoutes from './upload-file/upload-file.route';
import UserRoutes from './user/user.route';

const router = Router();

router.use('/auth', AuthRoutes);
router.use('/books', BookRoutes);
router.use('/categories', CategoryRoutes);
router.use('/upload-file', UploadFileRoutes);
router.use('/users', UserRoutes);

export default router;
