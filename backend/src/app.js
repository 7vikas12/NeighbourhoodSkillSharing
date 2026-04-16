import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const corsOrigin =
  !process.env.CORS_ORIGIN || process.env.CORS_ORIGIN === "*"
    ? "http://localhost:5173"
    : process.env.CORS_ORIGIN;


app.use(cors({
    origin: corsOrigin,
    credentials: true
}))

app.use(express.json({limit:"100mb"}))
app.use(express.urlencoded({extended: true, limit: "100mb"}))
app.use(cookieParser());


import userRouter from "./routes/user.routes.js";
import skillRouter from "./routes/skill.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/skills", skillRouter);

app.get("/test", (req, res) => {
  res.send("Hello World");
});

export default app;