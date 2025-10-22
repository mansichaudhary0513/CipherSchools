

import express from "express";
const authRouter = express.Router();
import { Signup, Login, Logout, verifyUser} from "../Controllers/Auth.js";
import { authMiddleware } from "../Controllers/AuthMiddelware.js";


authRouter.post('/signup', Signup);
authRouter.post('/login', Login);
authRouter.get("/logout", Logout);
authRouter.get("/verify", authMiddleware, verifyUser);
export {authRouter};