import { User } from '@prisma/client';
import { File } from 'multer';
import "express";

declare global {
  namespace Express {
    interface Request {
      user?: User & { iat?: number };
      file?: File;
    }
  }
}

export {};