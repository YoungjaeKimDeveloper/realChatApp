import React, { useEffect } from "react";
import { Contact } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
const Sidebar = () => {
  const { users, isUserLoading, getUsers, selectUser, selectedUser } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  if (isUserLoading) {
    return <p>Loading..</p>;
  }
  console.log(selectedUser);
  return (
    <div className="bg-red-200 w-[400px] rounded-xl px-2 h-full overflow-auto">
      <div className="flex items-center gap-x-2 py-4 rounded-xl">
        <Contact size={26} />
        <h1 className="font-semibold text-2xl">Contact</h1>
      </div>
      <div className="user-list gap-x-4 flex w-full  gap-4  flex-col">
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
              <div>
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
