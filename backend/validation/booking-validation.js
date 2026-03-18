import { z } from "zod";

const bookingValidationSchema = z.object({
  customerName: z
    .string({ requiredError: "Customer name isrequired" })
    .min(6, "Minimum 6 characters required for name."),
  phone: z
    .string({ requiredError: "Phone number is required." })
    .min(10, "Phone should ne of 10 numbers."),
  service: z.string({ requiredError: "Service is required." }),
  address: z
    .string({ requiredError: "Address is Required." })
    .min(10, "Address should be of atleast 10 characters."),
  status: z.enum(["Pending", "In Progress", "Completed"]).optional(),
});

const customerValidationSchema = z.object({
  name: z
    .string({ requiredError: "Customer Name is Required." })
    .min(6, "Atleast 6 characters are required in name."),
  phone: z
    .string({ requiredError: "Phone number is required." })
    .min(10, "Phone should ne of 10 numbers."),
  address: z
    .string({ requiredError: "Address is Required." })
    .min(10, "Address should be of atleast 10 characters."),
});

export { bookingValidationSchema, customerValidationSchema };
