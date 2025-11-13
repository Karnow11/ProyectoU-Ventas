import express, { NextFunction, Request, Response } from "express";
import logger from "./middlewares/logger";
import config from "./utils/config";
import mongoose from "mongoose";
import { unknownEndpoint, errorHandler } from "./middlewares/handlerError";
import { withUser } from "./middlewares/authMiddelwares"
import loginRouter  from "./controllers/loginController";
import cookieParser from "cookie-parser";

export const app = express();

mongoose.set("strictQuery", false);

if (config.MONGODB_URI) {
  mongoose.connect(config.MONGODB_URI, { dbName: config.MONGODB_DBNAME }).catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });
}

app.use(express.static("dist"));
app.use(express.json());
app.use(cookieParser());

app.use(errorHandler)
app.use(unknownEndpoint)
