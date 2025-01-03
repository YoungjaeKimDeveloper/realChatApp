import React from "react";
import { MessageCircleHeart } from "lucide-react";

const NoChat = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-blue-50 text-center">
      <MessageCircleHeart
        className="size-10 lg:size-40 animate-bounce "
        color="#de58a7"
      />
      <h1 className="tracking-wider font-semibold text-sm mt-4  lg:text-2xl ">
        Let's get started new conversation
      </h1>
    </div>
  );
};

export default NoChat;
