import React, { useState } from "react";
import { Send, Images } from "lucide-react";
const ChatInput = ({ styleName }) => {
  const [text, settext] = useState("");
  return (
    <div
      className={`${styleName} row-span-1 col-span-3 bg-pink-100 h-[538px] `}
    >
      <form></form>
    </div>
  );
};

export default ChatInput;
