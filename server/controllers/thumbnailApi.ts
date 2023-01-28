import { AppError } from "../errors/AppError";
import { Request, Response } from "express";
import * as multer from "multer";

import { HttpCode } from "../constants/httpCode";

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "public/assets/images/thumbnail/");
    },
    filename(req, file, cb) {
      cb(null, `${req.params.workspaceId}.png`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("file");

export const uploadThumbnail = (req: Request, res: Response): Promise<void> =>
  new Promise((resolve, reject) => {
    upload(req, res, (err) => {
      if (err) {
        reject(
          new AppError({
            httpCode: HttpCode.INTERNAL_SERVER_ERROR,
            description: "썸네일 업로드에 실패했습니다.",
            error: err,
          })
        );
      } else {
        res.status(HttpCode.OK).json({
          message: "썸네일이 정상적으로 저장되었습니다.",
          result: {
            workspaceId: req.params.workspaceId,
          },
        });
        resolve();
      }
    });
  });
