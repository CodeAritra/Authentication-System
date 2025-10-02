import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/user.route"

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("hii");
});

app.use("/api/auth",authRouter)

const PORT = process.env.PORT || 2000;
// app.listen(PORT, () => {
//   console.log(`App is running at http://localhost:${PORT}`);
// });

mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is running at http://localhost:${PORT}`);
    });
    console.log("Db connected")
  })
  .catch((err) => console.log("Mongodb connection error"));
