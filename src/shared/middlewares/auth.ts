import { RequestHandler } from 'express';
import { IPayloadDto } from 'modules/auth/dtos/payload.dto';

import AppException from '@errors/app-exception';
import ErrorMessages from '@errors/error-messages';
import passport from '@libs/passport';

class AuthMiddleware {
  public isAuthenticated: RequestHandler = (req, res, next) => {
    passport.authenticate('jwt', { session: false, failWithError: true },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (err: any, payload: IPayloadDto, info: any) => {
        if (err) return next(err);
        if (!payload) return next(new AppException(401, ErrorMessages.UNATHORIZED));
        else req.auth = payload;
      },
    )(req, res, next);
    next();
  };
}

export default new AuthMiddleware();
