import React, { useEffect } from "react";
import { Contact } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
const Sidebar = ({ style }) => {
  const { users, isUserLoading, getUsers, selectUser, selectedUser } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  if (isUserLoading) {
    return <p>Loading..</p>;
  }

  return (
    <div
      className={`${style} flex h-full w-[200px] flex-col overflow-auto rounded-l-xl`}
    >
      <div className="gap-y-2rounded-xl hidden p-6 lg:flex lg:items-center gap-x-2 bg-red-200">
        <Contact size={26} />
        <h1 className="text-2xl font-semibold">Contact</h1>
      </div>

      {/* USERS list*/}
      <div className="bg- ] flex h-full flex-col items-center gap-y-4  bg-slate-100 p-4 sm:w-full sm:flex-col lg:items-baseline">
        {users?.map((user) => (
          <div
            key={user._id}
            className="flex items-center gap-x-2 hover:cursor-pointer"
            onClick={() => selectUser(user)}
          >
            <img
              src={`${user.profilePic}` || "../../public/avartar.png"}
              alt="user-profile"
              className="size-7 rounded-full sm:size-10"
            />
            {/* User Details */}
            <div className="hidden lg:block">
              <p className="text-[12px]">{user.fullName}</p>
              {onlineUsers?.includes(user._id) ? (
                <p className="font-bold text-green-400">online</p>
              ) : (
                <p className="font-bold text-red-400">offline</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
