import express from "express";
import Selling_point from "../models/selling_points";
import type Selling_points_Data from "../types/selling_points_data";
import Review from "../models/reviews"
import type Review_Data  from "../types/review_data"
import SPModel from "../models/selling_points";
import withUser from "../middlewares/authMiddelwares";
import User from "../models/User";


interface SPData {
  selling_point: Selling_points_Data
  reviews?: Review_Data[]
}  

const router = express.Router();

router.get("/", (request, response) => {
  SPModel.find({}).then((sp) => {
    response.json(sp);
  });
});

router.get("/:id", (request, response, next) => {
  const id = request.params.id;
  const sp = SPModel.findById(id);
  const reviews = SPModel.find({ thread: id });
  Promise.all([sp, reviews])
    .then(([sp, reviews]) => {
      if (sp) {
        response.json({ selling_point: sp, reviews: reviews });
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

router.post("/", withUser, async (request, response, next) => {
  const body = request.body;
  const user_id = request.userId

  const post = new SPModel({
    name: body.name,
    user_id,
    description: body.description,
    static_point: body.static_point,
    product_type: body.product_type,
    zone: body.zone
  });

  post.save()
    .then((savedPost) => {
      response.status(201).json(savedPost);
    })
    .catch((error) => next(error));
});

router.post("/:id", async (request, response, next) => {

  const body = request.body;
  const SPId = request.params.id;

  const token = request.cookies?.token;

  const post = new SPModel({
    author: body.author,
    content: body.content,
    SP_id: SPId,
  });

  post.save()
    .then((savedPost) => {
      response.status(201).json(savedPost);
    })
    .catch((error) => next(error));
});

router.put("/:id", (request, response, next) => {
  const body = request.body;
  const id = request.params.id;

  SPModel.findByIdAndUpdate(id, body, { new: true })
    .then((updatedPost) => {
      if (updatedPost) {
        response.json(updatedPost);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

router.get("/user/:id", async (request, response, next) => {
  const user_id = request.params.id
  SPModel.find({user_id}).then((sp) => {
    response.json(sp);
  }).catch((error) => next(error));
})

export default router;