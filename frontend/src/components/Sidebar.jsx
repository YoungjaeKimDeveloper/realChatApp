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
    <div className={`${style} overflow-auto flex rounded-l-xl flex flex-col`}>
      <div className="lg:flex items-center gap-x-2 py-4 rounded-xl hidden ">
        <Contact size={26} />
        <h1 className="font-semibold text-2xl">Contact</h1>
      </div>
      <div className="user-list gap-x-4 flex w-full  gap-4  flex-col mt-4">
        <div className="w-full flex flex-col gap-y-4">
          {users?.map((user) => (
            <div
              key={user._id}
              className="user tester flex items-center gap-x-2 hover:cursor-pointer"
              onClick={() => selectUser(user)}
            >
              <img
                src={`${user.profilePic}` || "../../public/avartar.png"}
                alt="user-profile"
                className="size-10 rounded-full"
              />
              {/* User Details */}
              <div className="hidden lg:block">
                <p className="text-[12px]">{user.fullName}</p>
                {onlineUsers?.includes(user._id) ? (
                  <p className="text-green-400 font-bold">online</p>
                ) : (
                  <p className="text-red-400 font-bold">offline</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
