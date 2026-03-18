import Tenant from "../models/tenant-model.js";
import jwt from "jsonwebtoken";

const registerTenant = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const isEmailPresent = await Tenant.findOne({ email: email });
    if (!isEmailPresent) {
      const tenant = await Tenant.create({ name, email, password });
      // console.log("Tenant: ", tenant);

      // Generating refresh token
      const refreshToken = tenant.generateRefreshToken();
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(201).json({
        message: "Registered Successfully.",
        accessToken: tenant.generateAccessToken(),
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

    if (!isPassCorrect) {
      return res.status(401).json({ message: "Invalid Credentails." });
    }

    // Generating refresh token
    const refreshToken = userExist.generateRefreshToken();
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Logged In successfully.",
      accessToken: userExist.generateAccessToken(),
      userId: userExist._id.toString(),
      tenantId: userExist.tenantId,
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  return res.json({ message: "Logget out successfully." });
};

const refreshAccessToken = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({ message: "No Refresh Token." });
    }

    // No Refresh token found
    if (!token) return res.status(401).json({ message: "No Refresh Token." });

    // verifying refresh token and creating a new access token
    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET_KEY_2);
    const user = await Tenant.findById(verifiedUser.id);
    const newToken = user.generateAccessToken();
    return res.json({ accessToken: newToken });
  } catch (e) {
    return res.status(403).json({ message: "Invalid Refresh Token." });
  }
};

export { registerTenant, loginTenant, refreshAccessToken, logout };
