import React, { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { LoaderCircle } from "lucide-react";
const ChatInput = ({ styleName }) => {
  const {
    isLoadingConversation,
    selectedUser,
    listeningRealTimeMessage,
    unListeningRealTimeMessage,
    messages,
    getMessages,
    sendMessage,
  } = useChatStore();

  const { authUser, onlineUsers } = useAuthStore();
  const messageEndRef = useRef(null);
  // GET THE CONVERSAION
  useEffect(() => {
    listeningRealTimeMessage();
    getMessages(selectedUser);
    console.log("선택된 유저", selectedUser._id);
    // return () => unListeningRealTimeMessage();
  }, [
    getMessages,
    listeningRealTimeMessage,
    unListeningRealTimeMessage,
    selectedUser,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isLoadingConversation) {
    return (
      <div
        className={`${styleName} row-span-1 col-span-3 bg-pink-100 h-[538px] overflow-auto px-4 flex items-center justify-center`}
      >
        <LoaderCircle className="animate-spin size-20" />
      </div>
    );
  }
  console.log(messages);
  return (
    <div
      className={`${styleName} row-span-1 col-span-3 bg-pink-100 h-[390px] sm:h-[537px] overflow-auto px-4`}
    >
      {messages?.map((message, index) =>
        message.senderId !== selectedUser._id ? (
          <div className="chat chat-end" key={index} ref={messageEndRef}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src={authUser.profilePic}
                />
              </div>
            </div>
            <div className="chat-header"></div>
            <div className="chat-bubble">
              {message.image && (
                <img
                  src={message.image}
                  alt="chatting-image"
                  className="size-40"
                />
              )}
              {message.text}
            </div>
            <time className="text-xs opacity-50">12:46</time>
          </div>
        ) : (
          <div className="chat chat-start" key={index}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS ch촘체촘at bubble component"
                  src={selectedUser.profilePic || "../../public/avartar.png"}
                />
              </div>
            </div>
            <div className="chat-header"></div>
            <div className="chat-bubble">
              {message.image && (
                <img
                  src={message.image}
                  alt="chatting-image"
                  className="size-40"
                />
              )}
              {message.text}
            </div>
            <time className="text-xs opacity-50">12:46</time>
          </div>
        )
      )}
    </div>
  );
};

export default ChatInput;
