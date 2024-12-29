import express from "express";
import {
  signup,
  login,
  logout,
  profileUpdate,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();
// 로그인 전에 해줄것
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
// 로그인 후에
router.post("/profile-update", verifyToken, profileUpdate);

export default router;
