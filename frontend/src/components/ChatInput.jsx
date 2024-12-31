import React, { useState } from "react";
import { Send, Images } from "lucide-react";
const ChatInput = ({ styleName }) => {
  const [text, settext] = useState("");
  const [imagePriview, setImagePriview] = useState(null);
  const sendMessage = () => {};
  return (
    <div className={`${styleName} row-span-1 col-span-3 p-4  bg-red-100 h-20 `}>
      <form className="flex justify-between items-center">
        <input
          type="text"
          className="w-full mx-4 flex items-center bg-white p-2 rounded-xl"
        />
        <div className="flex items-center gap-4">
          <Send />
          <Images />
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
