import React from "react";
import { useChatStore } from "../store/useChatStore";
import { CircleX } from "lucide-react";

const ChatHeader = () => {
  const { selectedUser, unSelectUser } = useChatStore();

  return (
    <div className={`row-span-1 col-span-3 `}>
      <div className="flex items-center gap-x-2 justify-between bg-red-100 p-4">
        <div className=" flex items-center gap-x-2">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img
                src={selectedUser.profilePic || "../../public/avartar.png"}
              />
            </div>
          </div>
          <div>
            {selectedUser.fullName}
            <p>online</p>
          </div>
        </div>
        <CircleX className="hover:cursor-pointer" onClick={unSelectUser} />
      </div>
    </div>
  );
};

export default ChatHeader;
