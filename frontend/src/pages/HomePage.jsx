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
    <div className="w-scree flex h-screen justify-center">
      {/* Main-Container */}
      <div className="flex h-[864px] w-[1024px] rounded-2xl  mt-4">
        {/* Sidebar */}
        <Sidebar style={"w-[20%] md:w-[25%] h-full] bg-red-500 "} />
        {/* Main */}
        {selectedUser ? <ChatContainer /> : <NoChat />}
      </div>
    </div>
  );
};

export default HomePage;
