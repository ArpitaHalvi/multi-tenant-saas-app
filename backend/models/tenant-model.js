import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";

const tenantSchema = new Schema(
  {
    tenantId: {
      type: String,
      required: true,
      unique: true,
      default: () => uuidv4(),
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timeStamps: true },
);

// Before saving the password in database hash it
tenantSchema.pre("save", async function (next) {
  const tenant = this;
  if (!tenant.isModified("password")) {
    next();
  }
  try {
    const hashedPass = await argon2.hash(tenant.password);
    tenant.password = hashedPass;
  } catch (e) {
    next(e);
  }
});

// verify the password
tenantSchema.methods.verifyPassword = function (password) {
  return argon2.verify(this.password, password);
};

// Signing the token
tenantSchema.methods.generateAccessToken = function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        tenantId: this.tenantId,
      },
      process.env.JWT_SECRET_KEY_1,
      { expiresIn: "30m" },
    );
  } catch (e) {
    console.error("Error while signing token: ", e);
  }
};

tenantSchema.methods.generateRefreshToken = function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        tenantId: this.tenantId,
      },
      process.env.JWT_SECRET_KEY_2,
      { expiresIn: "7d" },
    );
  } catch (e) {
    console.error("Error while signing token: ", e);
  }
};

const Tenant = mongoose.model("Tenant", tenantSchema);

export default Tenant;
