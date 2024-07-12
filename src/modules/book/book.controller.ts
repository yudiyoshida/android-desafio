import { RequestHandler } from 'express';
import { RequestQueryOutputDto } from 'utils/dtos/request-query.dto';
import { CreateBookOutputDto } from './dtos/create-book.dto';

import CategoryService from '../category/category.service';
import Service from './book.service';

import AppException from '@errors/app-exception';
import PaginationHelper from '@helpers/pagination';

class Controller {
  public findAll: RequestHandler = async(req, res, next) => {
    try {
      const { limit = 10, page = 1, categoryId, search = '' } = req.query as RequestQueryOutputDto;

      const books = await Service.findAll(+limit, +page, req.auth.id, categoryId, search);
      const booksPaginated = PaginationHelper.paginate(books, +limit, +page);
      res.status(200).json(booksPaginated);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public findOne: RequestHandler = async(req, res, next) => {
    try {
      const book = await Service.findById(+req.params.id, req.auth.id);
      res.status(200).json(book);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public createOne: RequestHandler = async(req, res, next) => {
    try {
      const data = req.body as CreateBookOutputDto;

      await CategoryService.findById(data.categoryId);
      const newBook = await Service.create({ ...data, userId: req.auth.id });
      res.status(201).json(newBook);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };

  public deleteOne: RequestHandler = async(req, res, next) => {
    try {
      const book = await Service.findById(+req.params.id, req.auth.id);

      await Service.delete(book.id);
      res.sendStatus(204);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

export default new Controller();
