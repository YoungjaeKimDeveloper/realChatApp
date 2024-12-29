import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(400).json({ success: false, message: "NO TOKEN" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(400);
      // .json({ success: false, message: "FAILED TO DECODE" });
    }
    const user = await User.findOne({ _id: decoded.userId });
    // 이는 통과된 유저입니다!
    req.user = user;
    next();
  } catch (error) {
    console.error("FAILED TO VERIFY TOKEN ❌", error.message);
    return res.status(500).json({
      success: false,
      message: `INTERNAL ERROR TO VERIFY TOKEN ${error.message}`,
    });
  }
};
