import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    tenantId: {
      type: String,
      required: true,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Customer",
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
    service: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
  },
  { timeStamps: true },
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
