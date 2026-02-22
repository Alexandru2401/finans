import express from "express";
import "dotenv/config";
import db_pool from "./database/db.js";
import authRouter from "./routes/auth.routes.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/v1/auth", authRouter);

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`);
});
