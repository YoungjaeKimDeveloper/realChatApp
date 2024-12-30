import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl text-blue-300" to={"/"}>
          <p className="text-2xl font-bold tracking-wide">Chatty</p>

          <MessageCircle className="fill-red-200 text-red-500" />
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1"></ul>
      </div>
    </div>
  );
};

export default Navbar;
