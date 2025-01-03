import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import {
  MessageCircle,
  LogOut,
  UserRound,
  Menu,
  UserRoundPen,
  Beer,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);

  const toglleShowMenu = () => setShowMenu((prev) => !prev);

  let navigate = useNavigate();
  return (
    <div className="navbar flex items-center bg-red-400">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl text-blue-300" to={"/"}>
          <p className="font-mono text-2xl font-bold tracking-wide text-white">
            WhineTime
          </p>
          <Beer className="stroke-yellow-200 font-bold" />
        </Link>
      </div>
      {/* Left Side Menu bar */}
      <div className="flex flex-none flex-col">
        {/* For the mobile */}
        <div className="itmes-center relative flex flex-col justify-center p-4 sm:hidden">
          {authUser && (
            <Menu
              className="size-7 hover:cursor-pointer"
              onClick={toglleShowMenu}
            />
          )}
          {/* Drop Down Menu bar */}
          {showMenu && authUser && (
            <div className="absolute right-1 top-20 z-10 flex flex-col items-center justify-center gap-y-4 sm:hidden">
              <UserRoundPen
                className="size-10 rounded-xl bg-black stroke-yellow-500 p-2 hover:cursor-pointer"
                size={30}
                onClick={() => {
                  navigate("/profile");
                }}
              />
              <LogOut
                size={30}
                className="size-10 rounded-xl bg-black stroke-yellow-500 p-2 hover:cursor-pointer"
                onClick={logout}
              />
            </div>
          )}
        </div>

        {authUser && (
          <ul className="menu menu-horizontal hidden gap-x-4 gap-y-4 px-1 sm:flex">
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
