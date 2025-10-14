import { Request, Response, NextFunction } from "express"
import bcrypt from 'bcrypt';
import  User  from "../Model/User";
import jwt from "jsonwebtoken";
import config from "../config";

export const login =  async (request: Request, response: Response, next: NextFunction) => {
  const { name, password } = request.body;

  const user = await User.findOne({ name });
  if (user) {
    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

    if (!passwordCorrect) {
      response.status(401).json({
        error: "invalid username or password",
      });
    } else {
      const userForToken = {
        username: user.name,
        csrf: crypto.randomUUID(),
        id: user._id,
      };

      const token = jwt.sign(userForToken, config.JWT_SECRET, {
        expiresIn: 60 * 60,
      });
      response.setHeader("X-CSRF-Token", userForToken.csrf);
      response.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      response.status(200).send({name: user.name });
    }
  } else {
    response.status(401).json({
      error: "invalid username or password",
    });
  }
  next();
}

export const getCurrentUser = async (request: Request, response: Response, next: NextFunction) => {
  const body = request.body;
  const user = await User.findById(request.userId);
  response.status(200).json(user)
};

export const logout = (request: Request, response: Response) => {
  response.clearCookie("token");
  response.status(200).send({
    message: "Logged out successfully"
  });
};