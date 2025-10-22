import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { Connection } from "./ConnectDb.js";
import { authRouter } from "./Routes/AuthRoute.js";
import { apiRouter } from "./Routes/ApiRoute.js";

dotenv.config();

const app = express();
const port = 3001;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use('/users', authRouter);
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
