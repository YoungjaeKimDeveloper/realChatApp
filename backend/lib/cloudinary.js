import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";

config();

cloudinary.config({
  cloud_name: process.env.cloudinary_NAME,
  api_key: process.env.cloudinary_API_KEY,
  api_secret: process.env.cloudinary_API_SECRET,
});

export default cloudinary;
