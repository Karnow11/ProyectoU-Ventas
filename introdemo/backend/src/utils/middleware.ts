import express from "express";
import logger from "./logger";


const requestLogger = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (
  error: { name: string; message: string },
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  logger.error(error.message);
  logger.error(error.name);
  
  if (error.name === "CastError") {
    response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    response.status(400).json({ error: error.message });
  }
  
  next(error);
};

export default { requestLogger, unknownEndpoint, errorHandler };
