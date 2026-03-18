import mongoose, { Schema } from "mongoose";

const customerSchema = new Schema(
  {
    tenantId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timeStamps: true },
);

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
