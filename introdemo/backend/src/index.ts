import dotenv from "dotenv";
dotenv.config();
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import path from "path";
import SPModel from "./models/selling_points";
import userRouter from "./controllers/userController";
import loginRouter from "./controllers/loginController";
//import withUser from "./middlewares/authMiddelwares";
import User from "./models/User";
import cookieParser from "cookie-parser";

import mongoose from "mongoose"; // Add this
import config from "./utils/config"; // Add this
import spRouter from "./controllers/selling_points"; // Add this

mongoose.set("strictQuery", false);
if (config.MONGODB_URI) {
  mongoose.connect(config.MONGODB_URI, { dbName: config.MONGODB_DBNAME }).catch((error) => {
    console.error("error connecting to MongoDB:", error.message);
  });
}

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

const requestLogger = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};
app.use(requestLogger);


app.get("/api/selling_points", (request, response) => {
  SPModel.find({ thread: null }).then((sp) => {
    response.json(sp);
  });
});

app.get("/api/selling_points/:id", (request, response, next) => {
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

app.post("/api/selling_points", async (request, response, next) => {
  const body = request.body;
  //const token = request.cookies?.token;

  //console.log("User ID:", request.userId);

  const post = new SPModel({
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
});

app.post("/api/selling_point/:id", async (request, response, next) => {

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

app.put("/api/selling_points/:id", (request, response, next) => {
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


app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);
app.use(express.static("dist"));

const errorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) => {
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

export default app;