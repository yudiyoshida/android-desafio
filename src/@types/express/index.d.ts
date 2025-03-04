import { IPayloadDto } from 'modules/auth/dtos/payload.dto';

// to make the file a module and avoid the TypeScript error.
export {};

declare global {
  namespace Express {
    export interface Request {
      auth: IPayloadDto;
      multer: Express.Multer.File & Express.MulterS3.File;
    }
  }
}
