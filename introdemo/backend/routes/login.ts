import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import express from "express";
import User  from "../Model/User";
import config from "../config";
import { withUser } from "../middlewares/authMiddelwares";
import {login, getCurrentUser, logout} from "../controllers/loginController" 


const router = express.Router();

router.post("/login", login );
router.get("/me", withUser, getCurrentUser);
router.post("/logout", logout);

export default router;
 
