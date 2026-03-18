import { Router } from "express";
import { registerTenant, loginTenant } from "../controllers/tenant-auth.js";
import validate from "../middlewares/validate-middleware.js";
import {
  loginSchema,
  tenantValidationSchema,
} from "../validation/tenant-validation.js";

const router = Router();

// endpoint: /api/tenant/register
router
  .route("/register")
  .post(validate(tenantValidationSchema), registerTenant);

// endpoint: /api/tenant/login
router.route("/login").post(validate(loginSchema), loginTenant);

export default router;
