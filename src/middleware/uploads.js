
import multer from "multer";
import crypto from "node:crypto";
import path from "node:path";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../config/s3.js";

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 2,
  },

  fileFilter: (req, file, callback) => {
    const allowedTypes = new Map([
      [".jpg", "image/jpeg"],
      [".jpeg", "image/jpeg"],
      [".png", "image/png"],
      [".webp", "image/webp"],
      [".pdf", "application/pdf"]
    ]);

    const extension = path.extname(file.originalname).toLowerCase();

    if (allowedTypes.get(extension) === file.mimetype) {
      return callback(null, true);
    }

    const error = new Error("Only JPG, JPEG, PNG, WEBP and PDF files are allowed");

    error.code = "UNSUPPORTED_FILE_TYPE";

    callback(error);
  },
});

export function uploadProjectImage(fields) {
  return (req, res, next) => {
    upload.fields(fields)(req, res, (error) => {
      if (error) {
        const statusCode =
          error.code === "LIMIT_FILE_SIZE"
            ? 413
            : error.code === "UNSUPPORTED_FILE_TYPE"
              ? 415
              : 400;

        return res.status(statusCode).json({
          success: false,
          message: error.message,
        });
      }

      next();
    });
  };
}

// Upload Image to S3
export async function uploadToS3(file, originalFileName) {
  const bucketName = process.env.AWS_BUCKET_NAME;
  const region = process.env.AWS_REGION;

  const extension = path.extname(originalFileName).toLowerCase();
  const baseName = path.basename(originalFileName, path.extname(originalFileName));

  const fileName = `${crypto.randomUUID()}-${baseName}${extension}`;

  const fileKey = `projects/${fileName}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    }),
  );

  const fileUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${fileKey}`;

  return {
    fileName,
    fileKey,
    fileUrl,
  };
}
