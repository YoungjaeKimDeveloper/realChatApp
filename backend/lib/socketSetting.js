import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
// TAP UP THE SOCKET.IO
// State - onlineUser Tracker
// 2개
// onlineUser = {userId:SocketId}
const onlineUsers = {};
2;
export function getReceiverSocketId(userId) {
  // will return socketId
  return onlineUsers[userId];
}
// Aciton
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

// SOCKET CONNECTION
io.on("connection", (socket) => {
  console.info(`${socket.id} is connected ✅`);
  const userID = socket.handshake.query.userID;
  console.log("✅HANDSHAKE INFO", userID);
  if (userID) onlineUsers[userID] = socket.id;
  // Send the notificaiton to the clients
  // onlineUser = {userId:SocketId}
  io.emit("updateOnlineUsersID", Object.keys(onlineUsers));
  // Event base
  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected ❌`);
    delete onlineUsers[userID];
    io.emit("updateOnlineUsersID", Object.keys(onlineUsers));
  });
});

export { app, server, io };
