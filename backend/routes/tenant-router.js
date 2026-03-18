import { Router } from "express";
import {
  registerTenant,
  loginTenant,
  refreshAccessToken,
  logout,
} from "../controllers/tenant-controller.js";
import validate from "../middlewares/validate-middleware.js";
import {
  loginSchema,
  tenantValidationSchema,
} from "../validation/tenant-validation.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const router = Router();

// Register user
router
  .route("/register")
  .post(validate(tenantValidationSchema), registerTenant);

// Login User
router.route("/login").post(validate(loginSchema), loginTenant);

// New Access Token
router.route("/refresh-token").post(refreshAccessToken);

// Logout
router.route("/logout").post(logout);
export default router;
