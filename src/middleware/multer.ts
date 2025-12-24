import fs from "fs";
import multer from "multer"
import path from 'path'
import { Request } from 'express'

import CustomError from "./error.handler";

export const uploadFile = () => {
  const folder = "uploads";
  const file_size = 5 * 1024 * 1024; // 5mb
  const allowed_ext = ["jpg", "jpeg", "png", "webp", "svg"];

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, folder);
    },
      filename: function (req, file, cb) {
    const fileName = Date.now() + '-' + file.originalname
    cb(null, fileName)
  }
  });
  const file_filter = (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) => {
    const ext = path.extname(file.originalname).replace(".", "");
    const isAllowed = allowed_ext.includes(ext);
    if (isAllowed) {
      cb(null, true);
    } else {
      const message = `${ext} is not allowed.Only ${allowed_ext.join(
        ","
      )} are allowed.`;
      cb(new CustomError(message,404));
    }
  };
    const upload = multer({
    storage: storage,
    limits: { fileSize: file_size },
    fileFilter: file_filter,
  });

  return upload;
};
