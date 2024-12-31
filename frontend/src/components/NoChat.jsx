import React from "react";
import { MessageCircleHeart } from "lucide-react";

const NoChat = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-blue-50 text-center">
      <MessageCircleHeart
        className="lg:size-40 animate-bounce "
        color="#de58a7"
      />
      <h1 className="tracking-wider font-semibold text-2xl ">
        Let's get started new conversation
      </h1>
    </div>
  );
};

export default NoChat;
