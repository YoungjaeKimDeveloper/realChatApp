import React, { useState } from "react";
import { Send, Images, MousePointerBan } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
const ChatInput = ({ styleName }) => {
  const { sendMessage, isSendingMessage } = useChatStore();

  const [message, setMessage] = useState({
    text: "",
    image: "",
  });
  const [previewImage, setPreviewImage] = useState("");

  const handlePreviewImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewImage(reader.result);
      setMessage({ ...message, image: reader.result });
    };
  };

  const sendingMessage = async (e) => {
    try {
      e.preventDefault();
      await sendMessage(message);
      // After sending the message
      setMessage({
        text: "",
        image: "",
      });
      setPreviewImage(null);
    } catch (error) {
      console.error(`FAILED TO SEND THE MESSAGE ❌ ${error.message}`);
    }
  };

  return (
    <div className={`${styleName} row-span-1 col-span-3 p-4  bg-red-100 h-20 `}>
      <form className="flex justify-between items-center relative">
        <input
          type="text"
          className="w-full mx-4 flex items-center bg-white p-2 rounded-xl"
          value={message.text}
          onChange={(e) => setMessage({ ...message, text: e.target.value })}
        />
        <div className="flex items-center gap-4">
          {/* Send the message */}
          <label className="hover:cursor-pointer">
            <input type="file" hidden onChange={handlePreviewImage} />
            <Images />
          </label>
          <button disabled={isSendingMessage} onClick={sendingMessage}>
            {isSendingMessage ? <MousePointerBan /> : <Send />}
          </button>
        </div>
        <div>
          {previewImage && (
            <img
              src={previewImage}
              alt="message-image"
              className="absolute bottom-12 left-5 size-20  mb-4 rounded-xl"
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
