import React from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatRoom from "./ChatRoom";

const ChatContainer = () => {
  return (
    <div className="w-full h-full bg-blue-100 grid grid-row-4 grid-cols-3">
      <ChatHeader />
      <ChatRoom />
      <ChatInput />
    </div>
  );
};

export default ChatContainer;
