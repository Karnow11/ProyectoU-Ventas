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
exports.getUserById = exports.getUsers = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(501).json({ error: 'Not implemented' });
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
router.get("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.find({});
    response.json(users);
}));
router.post("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = request.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return response.status(400).json({ error: "Invalid email format" });
    }
    const saltRounds = 10;
    const passwordHash = yield bcrypt_1.default.hash(password, saltRounds);
    const user = new User_1.default({
        username,
        email,
        passwordHash,
    });
    const savedUser = yield user.save();
    response.status(201).json(savedUser);
}));
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(501).json({ error: 'Not implemented' });
    }
    catch (error) {
        next(error);
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(501).json({ error: 'Not implemented' });
    }
    catch (error) {
        next(error);
    }
});
exports.getUserById = getUserById;
exports.default = router;
