import Tenant from "../models/tenant-model.js";

const registerTenant = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const isEmailPresent = await Tenant.findOne({ email: email });
    if (!isEmailPresent) {
      const tenant = await Tenant.create({ name, email, password });
      console.log("Tenant: ", tenant);
      return res.status(201).json({
        message: "Registered Successfully.",
        accessToken: tenant.generateAccessToken(),
        refreshToken: tenant.generateRefreshToken(),
        tenantId: tenant.tenantId,
        userId: tenant._id.toString(),
      });
    }
    // Email already present
    return res.status(400).json({ message: "Email already exists." });
  } catch (e) {
    console.error("Error while registering tenant.", e);
    next(e);
  }
};

const loginTenant = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userExist = await Tenant.findOne({ email: email });
    if (!userExist)
      return res.status(404).json({ message: "You are not registered." });
    const isPassCorrect = await userExist.verifyPassword(password);
    if (!isPassCorrect)
      return res.status(401).json({ message: "Invalid Credentails." });
    return res.status(200).json({
      message: "Logged In successfully.",
      accessToken: userExist.generateAccessToken(),
      refreshToken: userExist.generateRefreshToken(),
      userId: userExist._id.toString(),
      tenantId: userExist.tenantId,
    });
  } catch (e) {
    next(e);
  }
};

export { registerTenant, loginTenant };
