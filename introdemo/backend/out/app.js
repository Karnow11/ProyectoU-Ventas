"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./middlewares/logger"));
const config_1 = __importDefault(require("./utils/config"));
const mongoose_1 = __importDefault(require("mongoose"));
const handlerError_1 = require("./middlewares/handlerError");
const loginController_1 = __importDefault(require("./controllers/loginController"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
exports.app = (0, express_1.default)();
mongoose_1.default.set("strictQuery", false);
if (config_1.default.MONGODB_URI) {
    mongoose_1.default.connect(config_1.default.MONGODB_URI, { dbName: config_1.default.MONGODB_DBNAME }).catch((error) => {
        logger_1.default.error("error connecting to MongoDB:", error.message);
    });
}
exports.app.use(express_1.default.static("dist"));
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(loginController_1.default);
exports.app.use(handlerError_1.errorHandler);
exports.app.use(handlerError_1.unknownEndpoint);
