import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
// swagger
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
import cookieParser from "cookie-parser";
import cors from 'cors';
// routers

import postRoutes from "./routes/Post.router.js";
import authRoutes from "./routes/Auth.router.js";

// app

const app = express();

// logger

morgan('combined')

// dotenv

dotenv.config();

// swagger
const swaggerJsDocs = YAML.load("./api.yaml");
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));

// middleware
app.use(cors({
  origin:'http://localhost:3000'
}));
app.use(express.json());

// routes

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes)


// connection to database

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_DB_PSW)
  .then(() => {
    console.log("Database successfully connected!");
    app.listen(port, () => {
      console.log("listening on port 8000");
    });
  })
  .catch((error) => {
    console.log(error);
  }); 





