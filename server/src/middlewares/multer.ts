import { Request } from "express";
import multer from "multer";
import { v4 as uuid } from "uuid";
import config from "../config/index.js";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "uploads");
  },
  filename(req, file, callback) {
    const id = uuid();
    const extName = file.originalname.split(".").pop();
    callback(null, `${id}.${extName}`);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"];

  // Check if the file type is allowed
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG, and GIF files are allowed."));
  }
};

const upload = multer({ storage, fileFilter });
export const singleUpload = upload.single("photo");
export const multipleUploads = upload.array("photos", config.maxProductsPhotosLimit);
