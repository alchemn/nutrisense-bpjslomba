import { User } from '@prisma/client';
import { File } from 'multer';
import "express";

declare global {
  namespace Express {
    interface Request {
      user?: User;
      file?: File;
    }
  }
}

declare module "express" {
  interface Request {
    user?: {
      id: string;
      email: string;
      iat: number;
    };
  }
}

export {};