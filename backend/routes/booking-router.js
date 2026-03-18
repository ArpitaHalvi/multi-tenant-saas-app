import { Router } from "express";
import validate from "../middlewares/validate-middleware.js";
import { bookingValidationSchema } from "../validation/booking-validation.js";
import {
  bookingsOfTenant,
  createBooking,
} from "../controllers/booking-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const router = Router();

router
  .route("/")
  .get(authMiddleware, bookingsOfTenant)
  .post(authMiddleware, validate(bookingValidationSchema), createBooking);

export default router;
