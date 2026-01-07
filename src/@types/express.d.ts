
import { Iplayload } from './interface.types';
import multer from 'multer'
declare global {
  namespace Express {
    interface Request {
      user: Iplayload
      file?: Multer.File;
    }
  }
}

