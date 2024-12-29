import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.cloudinary_NAME,
  api_key: process.env.cloudinary_API_KEY,
  api_secret: process.envcloudinary_API_SECRET,
});

export default cloudinary;
