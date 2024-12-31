import Sidebar from "../components/Sidebar";
import React from "react";

const HomePage = () => {
  return (
    <div className="   h-screen p-10 w-scree flex  justify-center">
      <div className="bg-red-300 w-[80%] h-[80%] rounded-2xl">
        <div className="Sidebar Postion h-full ">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
