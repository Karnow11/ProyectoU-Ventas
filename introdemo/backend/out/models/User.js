"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: [true, "este nombre de usuario ya está ocupado"] },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true }
});
const User = mongoose_1.default.model("User", userSchema);
userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        var _a;
        returnedObject.id = (_a = returnedObject._id) === null || _a === void 0 ? void 0 : _a.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    },
});
exports.default = User;
