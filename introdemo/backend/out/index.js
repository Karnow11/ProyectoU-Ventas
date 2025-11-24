"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const selling_points_1 = __importDefault(require("./models/selling_points"));
const userController_1 = __importDefault(require("./controllers/userController"));
const loginController_1 = __importDefault(require("./controllers/loginController"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose")); // Add this
const config_1 = __importDefault(require("./utils/config")); // Add this
mongoose_1.default.set("strictQuery", false);
if (config_1.default.MONGODB_URI) {
    mongoose_1.default.connect(config_1.default.MONGODB_URI, { dbName: config_1.default.MONGODB_DBNAME }).catch((error) => {
        console.error("error connecting to MongoDB:", error.message);
    });
}
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const requestLogger = (request, response, next) => {
    console.log("Method:", request.method);
    console.log("Path:  ", request.path);
    console.log("Body:  ", request.body);
    console.log("---");
    next();
};
app.use(requestLogger);
app.get("/api/selling_points", (request, response) => {
    selling_points_1.default.find({ thread: null }).then((sp) => {
        response.json(sp);
    });
});
app.get("/api/selling_points/:id", (request, response, next) => {
    const id = request.params.id;
    const sp = selling_points_1.default.findById(id);
    const reviews = selling_points_1.default.find({ thread: id });
    Promise.all([sp, reviews])
        .then(([sp, reviews]) => {
        if (sp) {
            response.json({ selling_point: sp, reviews: reviews });
        }
        else {
            response.status(404).end();
        }
    })
        .catch((error) => next(error));
});
app.post("/api/selling_points", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const body = request.body;
    const token = (_a = request.cookies) === null || _a === void 0 ? void 0 : _a.token;
    console.log("User ID:", request.userId);
    const post = new selling_points_1.default({
        name: body.name,
        description: body.description,
        static_point: body.static_point,
        product_type: body.product_type
    });
    post.save()
        .then((savedPost) => {
        response.status(201).json(savedPost);
    })
        .catch((error) => next(error));
}));
app.post("/api/selling_point/:id", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const body = request.body;
    const SPId = request.params.id;
    const token = (_a = request.cookies) === null || _a === void 0 ? void 0 : _a.token;
    const post = new selling_points_1.default({
        author: body.author,
        content: body.content,
        SP_id: SPId,
    });
    post.save()
        .then((savedPost) => {
        response.status(201).json(savedPost);
    })
        .catch((error) => next(error));
}));
app.put("/api/selling_points/:id", (request, response, next) => {
    const body = request.body;
    const id = request.params.id;
    selling_points_1.default.findByIdAndUpdate(id, body, { new: true })
        .then((updatedPost) => {
        if (updatedPost) {
            response.json(updatedPost);
        }
        else {
            response.status(404).end();
        }
    })
        .catch((error) => next(error));
});
app.use("/api/users", userController_1.default);
app.use("/api/login", loginController_1.default);
app.use(express_1.default.static("dist"));
const errorHandler = (error, request, response, next) => {
    console.error('Error:', error.message);
    if (error.name === "CastError") {
        return response.status(400).json({ error: "ID mal formateado" });
    }
    if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message });
    }
    if (error.code === 11000) {
        return response.status(400).json({
            error: "El username o email ya está registrado"
        });
    }
    if (error.name === "JsonWebTokenError") {
        return response.status(401).json({ error: "Token inválido" });
    }
    if (error.name === "TokenExpiredError") {
        return response.status(401).json({ error: "Token expirado" });
    }
    response.status(500).json({ error: "Error interno del servidor" });
};
app.use(errorHandler);
exports.default = app;
