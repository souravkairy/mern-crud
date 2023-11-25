import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import booksRoute from "./routes/booksRoute.js";
require("dotenv").config();

const app = express();

app.get("/", (request, response) => {
  return response.status(234).send("get done");
});

app.use(express.json());
app.use("/books", booksRoute);

// app.use(cors());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
