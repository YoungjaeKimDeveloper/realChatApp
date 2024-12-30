import express from "express";
import {
  getUsers,
  getConversation,
  sendMessage,
} from "../controllers/message.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

// 메세지 보내기
// 보내는 사람 req.user에 들어있음
// 받는사람 /:id

// 사이드바
router.use(verifyToken);
router.get("/users", getUsers);
// id: 상대
router.get("/conversation/:id", getConversation);
router.post("/send/:id", sendMessage);

export default router;
