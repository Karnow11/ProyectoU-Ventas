
import { Request, Response, NextFunction } from 'express';
import User from '../model/User';
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import config from '../utils/config';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (user) {
    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

    if (!passwordCorrect) {
      res.status(401).json({
        error: "invalid username or password",
      });
    } else {
      const userForToken = {
        username: user.username,
        csrf: crypto.randomUUID(),
        id: user._id,
      };

      const token = jwt.sign(userForToken, config.JWT_SECRET, {
        expiresIn: 60 * 60,
      });
      res.setHeader("X-CSRF-Token", userForToken.csrf);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      res.status(200)
      .send({ username: user.username}); 
      //.send({ username: user.username, name: user.name }); tenemos que devolver algo?
    }
  }}
  catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response) => {
  {
  res.clearCookie("token");
  res.status(200).send({
    message: "Logged out successfully"
  });
};
};
