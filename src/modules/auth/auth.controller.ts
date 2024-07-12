import { RequestHandler } from 'express';
import { LoginOutputDto } from './dtos/login.dto';

import UserService from '../user/user.service';

import AppException from '@errors/app-exception';
import PasswordHelper from '@helpers/password';
import JwtHelper from '@helpers/token';

class Controller {
  public login: RequestHandler = async(req, res, next) => {
    try {
      const { credential, password } = req.body as LoginOutputDto;

      // find account.
      const user = await UserService.findByCredential(credential);

      // check password.
      PasswordHelper.comparePasswordAndHash(password, user.password);

      // generate token and send response.
      res.status(200).json({
        token: JwtHelper.createToken({ id: user.id }),
      });

    } catch (err: any) {
      next(new AppException(err.status ?? 500, err.message));

    }
  };
}

export default new Controller();
