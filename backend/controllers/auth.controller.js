import { generateToken } from "../middleware/token.js";
import { User } from "../models/User.model.js";
import bcrypt from "bcrypt";
export const signup = async (req, res) => {
  try {
    // 유저가 입력한 Info
    let { email, fullName, password } = req.body;
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
    email = email.toLowerCase();
    const existedUser = await User.findOne({ email: email });

    if (existedUser) {
      return res.status(400).json({ message: "Email existed❗️" });
    }
    // Through all the Validations..
    // encrpt the password
    const encryptedPassword = await bcrypt.hash(password, 10);
    email = email.toLowerCase();
    const newUser = await User.create({
      email: email,
      fullName: fullName,
      password: encryptedPassword,
    });
    // console.log("New User Created✅");
    generateToken(newUser._id, res);
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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill up the All forms" });
    }
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );
    if (!user) {
      return res.status(400).json({ success: false, messagE: "INVALID USER" });
    }
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      return res.status(400).json({ success: false, messagE: "INVALID USER" });
    }
    return res.status(200).json({
      success: true,
      user: {
        email,
      },
    });
  } catch (error) {}
};

export const logout = () => {
  try {
  } catch (error) {}
};
