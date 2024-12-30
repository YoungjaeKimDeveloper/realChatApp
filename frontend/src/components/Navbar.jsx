import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle, LogOut, UserRound } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl text-blue-300" to={"/"}>
          <p className="text-2xl font-bold tracking-wide">Chatty</p>
          <MessageCircle className="fill-red-200 text-red-500" />
        </Link>
      </div>
      <div className="flex-none">
        {authUser && (
          <ul className="menu menu-horizontal px-1 gap-y-4 flex gap-x-4">
            <Link to="/profile">
              <button className="btn">
                <UserRound />
                Profile
              </button>
            </Link>

            <button className="btn" onClick={logout}>
              <LogOut />
              Logout
            </button>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
