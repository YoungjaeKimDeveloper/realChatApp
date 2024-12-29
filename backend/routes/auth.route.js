import express from "express";
import {
  signup,
  login,
  logout,
  profileUpdate,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();
// Auth Rotues
router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/profile-update", verifyToken, profileUpdate);

export default router;
