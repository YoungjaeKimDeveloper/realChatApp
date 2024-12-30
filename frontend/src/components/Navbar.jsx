import React from "react";

import { MessageCircle } from "lucide-react";
const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl text-blue-300">
          <p className="text-2xl font-bold tracking-wide">Chatty</p>
          <MessageCircle className="fill-red-200 text-red-500" />
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1"></ul>
      </div>
    </div>
  );
};

export default Navbar;
