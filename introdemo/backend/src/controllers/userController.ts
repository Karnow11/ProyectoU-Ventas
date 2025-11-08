import { Request, Response, NextFunction } from 'express';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
import User from "../models/User";

const router = express.Router();

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const {username, email, password} = req.body
  try {
    res.status(501).json({ username, email, password });
  } catch (error) {
    next(error);
  }
};

router.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

router.post("/", async (request, response) => {
  const { username, email, password } = request.body;

  if(!username && !email && !password){
    return response.status(400).json({ error: "Fill all the fields" })
  }

  const users = await User.find({username})
  console.log(users)
  if(users.length != 0){
    return response.status(400).json({ error: "Username is already taken" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return response.status(400).json({ error: "Invalid email format" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    email,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
})

export default router;