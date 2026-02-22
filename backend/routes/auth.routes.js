import { Router } from "express";
import { login, signUp } from "../controllers/auth.controllers.js";

const authRouter = Router();

authRouter.post("/sign-up", signUp)

authRouter.post("/login", login);

export default authRouter;
