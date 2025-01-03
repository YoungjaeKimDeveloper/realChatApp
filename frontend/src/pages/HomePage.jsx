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
    // 전체 컨테이너
    <div className="h-screen p-10 w-scree flex  justify-center">
      {/* Main-Container */}
      <div className="bg-red-300 w-[80%] h-[80%] rounded-2xl flex">
        {/* Sidebar */}
        <Sidebar style={"w-[10%] md:w-[20%] h-full bg-red-200 "} />
        {/* Main */}
        {selectedUser ? <ChatContainer /> : <NoChat />}
      </div>
    </div>
  );
};

export default HomePage;
