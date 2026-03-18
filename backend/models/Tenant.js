import { Schema } from "mongoose";

const tenantSchema = new Schema({
  tenantId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
});

const Tenant = mongoose.model("Tenant", tenantSchema);

export default Tenant;
