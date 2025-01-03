import React from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatRoom from "./ChatRoom";

const ChatContainer = () => {
  return (
    <div className="grid-row-4 grid h-full w-full grid-cols-3 bg-pink-100 ">
      <ChatHeader />
      <ChatRoom />
      <ChatInput />
    </div>
  );
};

export default ChatContainer;
