import { Router } from "express";
import { allCustomers } from "../controllers/customer-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const router = Router();

router.route("/").get(authMiddleware, allCustomers);

export default router;
