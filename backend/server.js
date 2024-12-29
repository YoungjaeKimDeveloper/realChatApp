import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  return res
    .status(201)
    .json({ success: true, messages: "SERVER IS CONNECTED" });
});

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON ${PORT}`);
  connectDB();
});
