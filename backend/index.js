import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import express from "express";
import mongoose from "mongoose";
import errorMiddleware from "./middlewares/error-middleware.js";
import tenantRoutes from "./routes/tenant-router.js";

const PORT = 1500;
const app = express();
const URL = process.env.MONGO_DB_URL;

app.use(express.json());

mongoose
  .connect(URL)
  .then(() => {
    console.log("Connected to MongoDB successfully!!");
    app.listen(PORT, () => {
      console.log(`Server listening on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error while connecting to database.", err);
  });

app.use("/api/tenant", tenantRoutes);
app.use(errorMiddleware);
