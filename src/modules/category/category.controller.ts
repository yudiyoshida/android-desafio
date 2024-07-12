import { RequestHandler } from 'express';

import AppException from '@errors/app-exception';
import Service from './category.service';

class Controller {
  public findAll: RequestHandler = async(req, res, next) => {
    try {
      const { limit = 10, page = 1 } = req.query;

      const categories = await Service.findAll(+limit, +page);
      // const categoriesPaginated = PaginationHelper.paginate(categories, +limit, +page);
      res.status(200).json(categories.at(0));

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

export default new Controller();
