import Customer from "../models/customer-model.js";

const allCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find({ tenantId: req.tenantId });
    if (customers.length === 0)
      return res.status(404).json({ message: "No customers found" });
    return res.status(200).json({ customers });
  } catch (e) {
    next(e);
  }
};

export { allCustomers };
