import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    min: 6,
    required: true,
  },
  profilePic: {
    type: String,
    default: "",
  },
});

export const User = mongoose.model("User", userSchema);
