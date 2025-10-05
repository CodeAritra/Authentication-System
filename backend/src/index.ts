import { requireAuth } from "./middlewares/auth.middleware";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./routes/user.route";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // your React app
    credentials: true,
  })
);

app.get("/", requireAuth, (req: express.Request, res: express.Response) => {
  res.json({
    success: true,
    message: `Welcome to your dashboard !`,
  });
});

app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`App is running at http://localhost:${PORT}`);
// });

mongoose
  .connect(
    process.env.MONGO_URI || "mongodb://localhost:27017/authentication_system"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is running at http://localhost:${PORT}`);
    });
    console.log("Db connected");
  })
  .catch((err) => console.log("Mongodb connection error"));
