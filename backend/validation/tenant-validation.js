import { z } from "zod";

const tenantValidationSchema = z.object({
  tenantId: z.string({ required_error: "Tenant ID is required." }),
  name: z
    .string({ required_error: "Name is required." })
    .min(6, { message: "Name must be at least 6 characters." })
    .max(255, { message: "Name must be less than 255 characters." }),
  email: z
    .string({ required_error: "Email is required." })
    .email({ message: "Invalid email format." }),
  password: z
    .string({ required_error: "Password is required." })
    .min(8, { message: "Password must be at least 8 characters." })
    .max(255, { message: "Password must be less than 255 characters." }),
});

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .email({ message: "Invalid email address." })
    .min(5, { message: "Email must be at least 5 characters." }),
  password: z
    .string({ required_error: "Password is required." })
    .trim()
    .min(8, { message: "Password should be at least 8 characters and unique." })
    .max(1024, { message: "Password should be less than 1024 characters." }),
});

export { tenantValidationSchema, loginSchema };
