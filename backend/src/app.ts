import express from "express";
import mongoose from "mongoose";

const app = express();

const PORT = 5000


mongoose
  .connect("mongodb://localhost:27017")
  .then(()=>app.listen(PORT,()=>console.log(`Server running in ${PORT}`)))
  .catch((err) => console.error("Error in connecting db", err));
