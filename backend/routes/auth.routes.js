import { Router } from "express";
import { login, signUp, getUser } from "../controllers/auth.controllers.js";

const authRouter = Router();

authRouter.post("/sign-up", signUp);

authRouter.post("/login", login);

authRouter.get("/get-user", getUser);

export default authRouter;
