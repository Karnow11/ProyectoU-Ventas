"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set("strictQuery", false);
const sellingPointSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 30
    },
    description: {
        type: String,
        minLength: 10,
        maxLength: 500
    },
    static_point: {
        type: Boolean,
        default: true
    },
    product_type: {
        type: String,
        default: "Otro",
        validate: {
            validator: (valor) => {
                const admitidos = ["Comida", "Artesania", "Servicios", "Ropa"];
                return admitidos.includes(valor);
            }
        }
    }
}, {
    timestamps: true
});
sellingPointSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        var _a;
        returnedObject.id = (_a = returnedObject._id) === null || _a === void 0 ? void 0 : _a.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
const SellingPoint = mongoose_1.default.model("SellingPoint", sellingPointSchema);
exports.default = SellingPoint;
