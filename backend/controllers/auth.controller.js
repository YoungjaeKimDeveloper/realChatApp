import { generateToken } from "../middleware/token.js";
import { User } from "../models/User.model.js";
import bcrypt from "bcrypt";
import cloudinary from "../lib/cloudinary.js";
export const signup = async (req, res) => {
  try {
    // 유저가 입력한 Info
    console.log("Request Body", req.body);
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
    console.log("Checking for existing user with email:", email);

    const existedUser = await User.findOne({ email: email });
    console.log("Existing user found:", existedUser);

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
      return res.status(400).json({ success: false, message: "INVALID USER" });
    }
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      return res.status(400).json({ success: false, message: "INVALID USER" });
    }
    generateToken(user._id, res);
    return res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    console.error("FAILED TO LOGIN", error.message);
    return res
      .status(400)
      .json({ success: false, message: `LOGIN ❌ ${error.message}` });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    return res.status(200).json({ success: true, message: "LOGGOUT ✅" });
  } catch (error) {
    console.error("FAILED TO LOGOUT", error.message);
    return res
      .status(400)
      .json({ success: false, message: `LOGGOUT ❌ ${error.message}` });
  }
};

export const profileUpdate = async (req, res) => {
  console.log(req.user);
  try {
    const user = req.user;
    const { profilePic } = req.body;
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "CANNOT FIND THE USER" });
    }
    const upload = await cloudinary.uploader.upload(profilePic);
    const updatedProfilePic = upload.secure_url;
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { profilePic: updatedProfilePic },
      // 갱신해주기
      { new: true }
    );
    return res.status(200).json({ success: true, updatedUser: updatedUser });
  } catch (error) {
    console.error("FAILED TO UPDATE USER PROFILE", error.message);
    return res
      .status(400)
      .json({ success: false, message: "FAILED TO UPDATE USER PROFILE" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "USER NO AUTHORIZED ❌" });
    }
    return res.status(200).json({ success: true, user: user });
  } catch (error) {
    console.log("FAILED TO CHECKAUTH: ", error.message);
    return res.status(400).json({
      success: false,
      message: `FAILED TO CHECK AUTH ${error.message}`,
    });
  }
};
