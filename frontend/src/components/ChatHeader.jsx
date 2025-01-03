import React from "react";
import { useChatStore } from "../store/useChatStore";
import { CircleX } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const ChatHeader = () => {
  const { selectedUser, unSelectUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  console.log("SELECTED USER", selectedUser);
  console.log("OnlineUsers", onlineUsers);
  return (
    <div className="col-span-3 row-span-1 h-[80px] w-[100%]">
      <div className="flex items-center justify-between gap-x-2 bg-red-100 p-4">
        <div className="flex items-center gap-x-2">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img
                src={selectedUser.profilePic || "../../public/avartar.png"}
              />
            </div>
          </div>
          <div>
            {selectedUser.fullName}
            {onlineUsers.includes(selectedUser._id) ? (
              <p className="font-semibold text-green-300">Online</p>
            ) : (
              <p className="font-semibold text-red-300">Offline</p>
            )}
          </div>
        </div>
        <CircleX className="hover:cursor-pointer" onClick={unSelectUser} />
      </div>
    </div>
  );
};

export default ChatHeader;
