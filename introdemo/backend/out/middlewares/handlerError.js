"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.unknownEndpoint = void 0;
const logger_1 = __importDefault(require("../middlewares/logger"));
const unknownEndpoint = (request, response, next) => {
    response.status(404).send({ error: "unknown endpoint" });
};
exports.unknownEndpoint = unknownEndpoint;
const errorHandler = (error, request, response, next) => {
    logger_1.default.error(error.message);
    logger_1.default.error(error.name);
    if (error.name === "CastError") {
        response.status(400).send({ error: "malformatted id" });
    }
    else if (error.name === "ValidationError") {
        response.status(400).json({ error: error.message });
    }
    else if (error.name === "MongoServerError" &&
        error.message.includes("E11000 duplicate key error")) {
        response
            .status(400)
            .json({ error: "expected `username` to be unique" });
    }
    else if (error.name === "JsonWebTokenError") {
        response.status(401).json({ error: "invalid token" });
    }
    else if (error.name === "TokenExpiredError") {
        response.status(401).json({ error: "invalid token" });
    }
    next(error);
};
exports.errorHandler = errorHandler;
//export default { unknownEndpoint, errorHandler };
