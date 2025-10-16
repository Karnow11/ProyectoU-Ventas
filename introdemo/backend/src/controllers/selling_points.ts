import express from "express";
import Selling_point from "../models/selling_points";
import type Selling_points_Data from "../types/selling_points_data";
import Review from "../models/reviews"
import type Review_Data  from "../types/review_data"


interface SPData {
  selling_point: Selling_points_Data
  reviews?: Review_Data[]
}  


const router = express.Router();

router.get("/", async (request, response) => {
  const sp = await Selling_point.find({});
  response.json(sp);
});


router.get("/:id", async (request, response, next) => {
    const id = request.params.id;
    const points = await Selling_point.findById(id);
    const reviews = await Review.find({ SP_id: id });

    if (!points) {
        return response.status(404).end();
    }

    const answer: SPData = {
      selling_point: points,
      reviews: reviews
  }

    if (answer) {
      response.json(answer);
    } else {
      response.status(404).end();
    }
});

router.post("/", async (request, response, next) => {
    const body = request.body;

    if (!body.name) {
    response.status(400).json({
      error: "Name missing",
    })};
    if (!body.description) {
    response.status(400).json({
      error: "Description missing",
    });

    } else {
        const selling_point = {
            name: body.name,
            description: body.description,
            static_point: body.static_point,
            product_type: body.product_type,
            reviews: {},
        };
        const selling_pointDocument = new Selling_point(selling_point);
        const savedselling_point = await selling_pointDocument.save();
        response.status(201).json(savedselling_point);
    }
});

router.post("/:id", async (request, response, next) => {
    const body = request.body;
    const id = request.params.id;

    if (!body.content) {
    response.status(400).json({
      error: "content missing",
    });

    } else {
        const review = {
            author: body.author || "anonymous",
            content: body.content,
            SP_id: id,
        };

        const reviewDocument = new Review(review);
        const savedReview = await reviewDocument.save();
        response.status(201).json(savedReview);
    }
});

export default router;