import jwt from "jsonwebtoken";
import Tenant from "../models/tenant-model.js";

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  console.log("Token: ", token);
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP request. Token not provided." });
  }
  const jwtToken = token.replace("Bearer ", "").trim();
  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY_1);
    console.log("IsVerified: ", isVerified);
    const tenant = await Tenant.findOne({
      tenantId: isVerified.tenantId,
    }).select({
      password: 0,
    });

    if (!tenant) return res.status(401).json({ message: "Tenant not found." });
    req.user = tenant;
    req.token = jwtToken;
    req.tenantId = tenant.tenantId;
    req.userId = tenant._id;
    next();
  } catch (e) {
    return res.status(401).json({
      message: "Unauthorized. Invalid Token.",
      extraDetails: "Please Login!",
    });
  }
};

export default authMiddleware;
