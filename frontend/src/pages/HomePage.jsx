import Sidebar from "../components/Sidebar";
import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
// Components
import ChatContainer from "../components/ChatContainer";
import NoChat from "../components/NoChat";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  return (
    <div className="h-screen p-10 w-scree flex  justify-center">
      <div className="bg-red-300 w-[80%] h-[80%] rounded-2xl">
        <div className="Sidebar Postion h-full flex ">
          <Sidebar />
          {selectedUser ? <ChatContainer /> : <NoChat />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
