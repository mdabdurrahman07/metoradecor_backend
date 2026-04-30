import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import
import userRouter from "./routes/users/user.routes.js";

// routes declaration
app.use("/api/v1/metoradecor/users", userRouter)
// output:- http://localhost:8000/api/v1/metoradecor/users
export { app };
