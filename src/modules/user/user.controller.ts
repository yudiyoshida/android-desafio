import { RequestHandler } from 'express';

import Service from './user.service';

import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import { CreateUserOutputDto } from './dtos/create-user.dto';

class Controller {
  public createOne: RequestHandler = async(req, res, next) => {
    try {
      const { confirmPassword, ...data } = req.body as CreateUserOutputDto;

      // Verifica se já existe um registro com os dados informados.
      const user = await Service.findByUniqueFields(data);
      if (user) throw new AppException(409, ErrorMessages.ACCOUNT_ALREADY_EXISTS);

      // Cadastra o novo usuário.
      const newUser = await Service.create(data);
      res.status(201).json(newUser);

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

export default new Controller();
