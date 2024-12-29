import express from "express";

const router = express.Router();

// 메세지 보내기
// 보내는 사람 req.user에 들어있음
// 받는사람 /:id

//
router.get("/users", getUsers);
//
router.get("/conversation/:id", sendMessage);
router.post("/send/:id", sendMessage);
