import express from "express";
import {
  signup,
  login,
  logout,
  profileUpdate,
} from "../controllers/auth.controller.js";

const router = express.Router();
// Auth Rotues
router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/profile-update", profileUpdate);

export default router;
