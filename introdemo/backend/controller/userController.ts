import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {

  try {
  const { username, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    passwordHash
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
  } catch(error) { 
    next(error)
  }
};
