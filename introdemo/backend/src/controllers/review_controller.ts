import express from "express";
import Selling_point from "../models/selling_points";
import type Selling_points_Data from "../types/selling_points_data";
import Review from "../models/reviews"
import type Review_Data  from "../types/review_data"
import SPModel from "../models/selling_points";
import withUser from "../middlewares/authMiddelwares";
import User from "../models/User";

const router = express.Router();

router.get("/sp/:id", (request, response) => {
    const id = request.params.id
    Review.find({sp_id: id}).then((reviews) => {
      response.json({reviews});
    });
});

router.post("/sp/:id", withUser, async (request, response, next) => {
  const body = request.body;
  const user_id = request.userId
  const sp_id = request.params.id

  const review = new Review({
    user_id,
    sp_id,
    qualification: body.qualification,
    content: body.content,
  });

  review.save()
    .then((savedPost) => {
      response.status(201).json(savedPost);
    })
    .catch((error) => next(error));
});

export default router;