import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import express from "express";
import mongoose from "mongoose";
import errorMiddleware from "./middlewares/error-middleware.js";
import tenantRoutes from "./routes/tenant-router.js";
import bookingRoutes from "./routes/booking-router.js";
import customerRoutes from "./routes/customer-router.js";
import cors from "cors";

const PORT = process.env.PORT || 5000;
const app = express();
const URL =
  process.env.MONGO_DB_URL || "mongodb://localhost:27017/multi-tentant-db";

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: "GET, POST, DELETE, PATCH, PUT, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
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

app.use("/api/auth/tenants", tenantRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/customers", customerRoutes);
app.use(errorMiddleware);
