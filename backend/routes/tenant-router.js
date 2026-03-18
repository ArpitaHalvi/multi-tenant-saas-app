import { Router } from "express";
import { registerTenant, loginTenant } from "../controllers/tenant-controller.js";
import validate from "../middlewares/validate-middleware.js";
import {
  loginSchema,
  tenantValidationSchema,
} from "../validation/tenant-validation.js";

const router = Router();

// Register user
router
  .route("/register")
  .post(validate(tenantValidationSchema), registerTenant);

// Login User
router.route("/login").post(validate(loginSchema), loginTenant);

export default router;
