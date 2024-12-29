import jwt from "jsonwebtoken";
import { User } from "../models/User.model";
export const verifyToken = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(400).json({ success: false, message: "NO TOKEN" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res
        .status(400)
        .json({ success: false, message: "FAILED TO DECODE" });
    }
    const user = await User.find({ _id: decoded.userId });
    return res.status(200).json({ user: user });
  } catch (error) {
    console.error("FAILED TO VERIFY TOKEN ❌", error.message);
    return res.status(500).json({
      success: false,
      message: `INTERNAL ERROR TO VERIFY TOKEN ${error.message}`,
    });
  }
};
