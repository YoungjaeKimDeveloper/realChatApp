import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Pencil } from "lucide-react";

const ProfilePage = () => {
  const { authUser } = useAuthStore();
  console.log(authUser);
  return (
    <div className="h-[600px] w-1/2 flex items-center justify-center mx-auto">
      <div className="bg-green-100   w-full  lg:w-3/4 h-full mt-20 rounded-xl ">
        <div className="flex flex-col  items-center justify-between  my-4 font-mono">
          <h1 className="font-semibold text-2xl text-green-400">Profile</h1>
          <p className="text-green-300 font-semibold ">
            Your profile information
          </p>
          <div className="relative mt-4">
            <img src="../../public/avartar.png" alt="" className="size-32" />
            <label className="absolute right-0 top-20 z-20 bg-green-50 rounded-2xl p-2">
              <Pencil className="cursor-pointer" />
              <input type="file" hidden />
            </label>
          </div>

          <div className="mt-10 flex flex-col gap-y-4">
            <p>Click the pencil to Update the Photo</p>
            {/* User Info */}
            <div className="border-solid border-2 rounded-xl border-green-500 flex py-4 px-2">
              <p className="font-semibold">Name: </p>
              <p>{authUser.fullName}</p>
            </div>
            <div className="border-solid border-2 rounded-xl border-green-500 flex py-4 px-2">
              <p className="font-semibold">Email: </p>
              <p>{authUser.email}</p>
            </div>
            <div className="border-solid border-2 rounded-xl border-green-500 flex py-4 px-2">
              <p className="font-semibold">Since: </p>
              <p>{authUser.createdAt.split("T")[0] || "Season 1 member"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;