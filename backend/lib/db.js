import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MONGO CONNECTED✅");
  } catch (error) {
    console.error("FAILED TO CONNECT DB ❌", error.message);
  }
};
