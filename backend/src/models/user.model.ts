import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, trim: true, required: true },
  password: { type: String, required: true, trim: true },
  name: { type: String, trim: true, default: "" },
  phone: { type: Number, required: true, trim: true }
});

export default UserSchema;
