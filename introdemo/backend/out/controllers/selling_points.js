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
const express_1 = __importDefault(require("express"));
const selling_points_1 = __importDefault(require("../models/selling_points"));
const reviews_1 = __importDefault(require("../models/reviews"));
const router = express_1.default.Router();
router.get("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const sp = yield selling_points_1.default.find({});
    response.json(sp);
}));
router.get("/:id", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    const points = yield selling_points_1.default.findById(id);
    const reviews = yield reviews_1.default.find({ SP_id: id });
    if (!points) {
        return response.status(404).end();
    }
    const answer = {
        selling_point: points,
        reviews: reviews
    };
    if (answer) {
        response.json(answer);
    }
    else {
        response.status(404).end();
    }
}));
router.post("/", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = request.body;
    if (!body.name) {
        response.status(400).json({
            error: "Name missing",
        });
    }
    ;
    if (!body.description) {
        response.status(400).json({
            error: "Description missing",
        });
    }
    else {
        const selling_point = {
            name: body.name,
            description: body.description,
            static_point: body.static_point,
            product_type: body.product_type,
            reviews: {},
        };
        const selling_pointDocument = new selling_points_1.default(selling_point);
        const savedselling_point = yield selling_pointDocument.save();
        response.status(201).json(savedselling_point);
    }
}));
router.post("/:id", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = request.body;
    const id = request.params.id;
    if (!body.content) {
        response.status(400).json({
            error: "content missing",
        });
    }
    else {
        const review = {
            author: body.author || "anonymous",
            content: body.content,
            SP_id: id,
        };
        const reviewDocument = new reviews_1.default(review);
        const savedReview = yield reviewDocument.save();
        response.status(201).json(savedReview);
    }
}));
exports.default = router;
