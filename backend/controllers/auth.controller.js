import { User } from "../models/User.model.js";
import bcrypt from "bcrypt";
export const signup = async (req, res) => {
  try {
    // 유저가 입력한 Info
    const { email, fullName, password } = req.body;
    // Validation...
    if (!email || !fullName || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill up the all forms❗️" });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password should be at least 6 letters❗️",
      });
    }
    const existedUser = await User.findOne({ email: email });
    if (existedUser) {
      return res.status(400).json({ message: "Email existed❗️" });
    }
    // Through all the Validations..
    // encrpt the password
    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email: email,
      fullName: fullName,
      password: encryptedPassword,
    });
    console.log("New User Created✅");
    return res.status(201).json({
      success: true,
      message: "New User Created✅",
      newUser: {
        email: email,
        fullName: fullName,
      },
    });
  } catch (error) {
    console.error("Internal server error", error.message);
    return res.status(500).json({ success: false, message: "Internal Error" });
  }
};

export const login = () => {
  try {
  } catch (error) {}
};

export const logout = () => {
  try {
  } catch (error) {}
};
