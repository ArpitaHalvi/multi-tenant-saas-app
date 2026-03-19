import Booking from "../models/booking-model.js";
import Customer from "../models/customer-model.js";

const createBooking = async (req, res, next) => {
  try {
    const { customerName, phone, address, service, status } = req.body;
    let customerPresent = await Customer.findOne({ phone: phone });
    if (!customerPresent) {
      // create a new customer as it is not present
      const customer = await Customer.create({
        name: customerName,
        phone: phone,
        address: address,
        tenantId: req.tenantId,
      });
      customerPresent = customer;
    }
    // Customer already present so make booking
    const booking = await Booking.create({
      customerId: customerPresent._id,
      tenantId: req.tenantId,
      service: service,
      address: address,
      phone: customerPresent.phone,
      status: status,
    });
    return res
      .status(201)
      .json({ message: "Booking made successfully!", booking: booking });
  } catch (e) {
    next(e);
  }
};

const bookingsOfTenant = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ tenantId: req.tenantId }).populate(
      "customerId",
      "name email phone",
    );
    if (bookings.length === 0)
      return res.status(404).json({ message: "No Bookings Found." });
    return res.status(200).json({ bookings });
  } catch (e) {
    next(e);
  }
};

export { createBooking, bookingsOfTenant };
