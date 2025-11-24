"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set("strictQuery", false);
const postSchema = new mongoose_1.default.Schema({
    author: {
        type: String,
        minLength: 3,
        maxLength: 30
    },
    content: {
        type: String,
        minLength: 10,
        maxLength: 500
    },
    SP_id: {
        type: String,
    },
}, {
    timestamps: true
});
postSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        var _a;
        returnedObject.id = (_a = returnedObject._id) === null || _a === void 0 ? void 0 : _a.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
const Review = mongoose_1.default.model("Post", postSchema);
exports.default = Review;
