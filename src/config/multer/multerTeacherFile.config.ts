import { HttpException } from '@/exceptions/HttpException';
import { diskStorage, Options } from 'multer';
import { extname } from 'path';
import fs from 'fs';
import { Request } from 'express';

export const multerTeacherConfig = {
  storage: diskStorage({
    destination: (req: Request, file, callback) => {
      const dir = './uploads/teachers';

      if (!fs.existsSync(dir)) {
        try {
          fs.mkdirSync(dir);
        } catch (error) {
          return callback(new HttpException(500, 'Internal server error'), dir);
        }
      }

      callback(null, dir);
    },
    filename: (req: Request, file, callback) => {
      const randomName = Array(16)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');

      callback(null, `${randomName}${extname(file.originalname)}`);
    },
  }),

  limits: { fileSize: 2 * 1024 * 1024 },

  fileFilter: async (req: Request, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) return new HttpException(400, 'Hanya file gambar yang diizinkan!');

    callback(null, true);
  },
} as Options;
