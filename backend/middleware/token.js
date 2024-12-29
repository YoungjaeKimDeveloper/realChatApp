import jwt from "jsonwebtoken";

// Validation
export const generateToken = (userId, res, next) => {
  try {
    const token = jwt.sign({ userId: userId }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    console.log("GENERATED THE TOKEN ✅");
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true, //prvent XSS attacks cross-site scripting attacks
      sameSite: "strict", // SCRF attacks cross-site request forgery attacks
      secure: process.env.NODE_ENV !== "development",
    });
    // return token;
    next();
  } catch (error) {
    console.log("FAILED TO GENERATE TOKEN❗️", error.message);
    return res.status(500).json({
      success: false,
      message: `FAILED TO GENERATE TOKEN ${error.message}`,
    });
  }
};
