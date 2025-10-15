import express from 'express';
import mongoose from 'mongoose';
import config from './utils/config';
import logger from "./utils/logger";
import middleware from './utils/middleware';
import spRouter from './controllers/selling_points';
import path from 'path';

const app = express();

mongoose.set("strictQuery", false);

if (config.MONGODB_URI) {
  mongoose.connect(config.MONGODB_URI).catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });
}

app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/selling_points", spRouter);

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);


export default app;