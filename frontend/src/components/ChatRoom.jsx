import React, { useEffect, useRef, useState } from "react";
import { Send, Images } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
const ChatInput = ({ styleName }) => {
  const {
    getConverstaion,
    isLoadingConversation,
    conversations,
    selectedUser,
  } = useChatStore();
  const { authUser } = useAuthStore();
  // GET THE CONVERSAION
  useEffect(() => {
    getConverstaion();
  }, [getConverstaion]);

  if (isLoadingConversation) {
    return <p>Loading...</p>;
  }
  console.log("conversation", conversations);
  return (
    <div
      className={`${styleName} row-span-1 col-span-3 bg-pink-100 h-[538px] overflow-auto px-4`}
    >
      {conversations?.map((conversation) =>
        conversation.senderId == authUser._id ? (
          <div className="chat chat-end">
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
              {conversation.image && (
                <img
                  src={conversation.image}
                  alt="chatting-image"
                  className="size-40"
                />
              )}
              {conversation.text}
            </div>
            <time className="text-xs opacity-50">12:46</time>
          </div>
        ) : (
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src={selectedUser.profilePic}
                />
              </div>
            </div>
            <div className="chat-header"></div>
            <div className="chat-bubble">
              {conversation.image && (
                <img
                  src={conversation.image}
                  alt="chatting-image"
                  className="size-40"
                />
              )}
              {conversation.text}
            </div>
            <time className="text-xs opacity-50">12:46</time>
          </div>
        )
      )}
    </div>
  );
};

export default ChatInput;
