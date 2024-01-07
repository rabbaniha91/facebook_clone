import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import "dotenv/config";

import { connectToDb } from "./config/configDB.js";
import userRouter from "./routes/userrouter.js";
import postRouter from "./routes/postrouter.js";
import corsOption from "./config/corsoption.js";
import credentials from "./middlewares/credentials.js";

const PORT = process.env.PORT || 8000;
const app = express();
connectToDb(process.env.MONGO_URI);
app.use(credentials);
app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/user", userRouter);
app.use("/post", postRouter);

mongoose.connection.once("open", () => {
  console.log("Connected to mongodb...");
  app.listen(PORT, "0.0.0.0", () => {
    console.log("server run on " + PORT);
  });
});
