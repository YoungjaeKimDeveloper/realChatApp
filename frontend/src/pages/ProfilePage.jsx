import React, { useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Pencil } from "lucide-react";
import Skeleton from "../skeleton/Skeleton";
const ProfilePage = () => {
  const { authUser, isProfileUploading, updateProfilePic } = useAuthStore();
  const [prviewImage, setPrviewImage] = useState(null);

  const saveImageFile = async (e) => {
    const file = e.target.files[0];
    e.preventDefault();
    if (!file) {
      throw new Error("NO FILE ❌");
    }
    const fileReaderMachine = new FileReader();
    fileReaderMachine.readAsDataURL(file);

    fileReaderMachine.onload = async () => {
      const base64Image = fileReaderMachine.result;
      setPrviewImage(fileReaderMachine.result);
      await updateProfilePic(base64Image);
    };
    // base url 64 incoding
  };

  return (
    <div className="h-[600px] w-full lg:w-1/2 px-4 flex items-center justify-center mx-auto">
      <div className="bg-green-100   w-full  lg:w-3/4 h-full mt-20 rounded-xl mx-4 ">
        <div className="flex flex-col  items-center justify-between  my-4 font-mono text-center">
          <h1 className="font-semibold text-2xl text-green-400">Profile</h1>
          <p className="text-green-300 font-semibold ">
            Your profile information
          </p>
          {isProfileUploading ? (
            <Skeleton />
          ) : (
            <div className="relative mt-4">
              <img
                src={authUser.profilePic || "../../public/avartar.png"}
                alt="profileImg"
                accept="image/*"
                className="size-32 rounded-full"
              />
              <label className="absolute right-0 top-20 z-20 bg-green-50 rounded-2xl p-2">
                <Pencil className="cursor-pointer" />
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={saveImageFile}
                />
              </label>
            </div>
          )}

          <div className="mt-10 flex flex-col gap-y-4 w-full items-center px-4">
            <p>Click the pencil to Update the Photo</p>
            {/* User Info */}
            <div className="border-solid border-2 rounded-xl border-green-500 flex py-4 px-2 w-1/2 text-sm text-[10px] lg:text-sm md:w-[200px] lg:w-1/2">
              <p className="font-semibold">Name: </p>
              <p>{authUser.fullName}</p>
            </div>
            <div className="border-solid border-2 rounded-xl border-green-500 flex py-4 px-2 w-1/2 text-sm text-[10px] lg:text-sm md:w-[200px] lg:w-1/2">
              <p className="font-semibold">Email: </p>
              <p>{authUser.email}</p>
            </div>
            <div className="border-solid border-2 rounded-xl border-green-500 flex py-4 px-2 w-1/2 text-sm text-[10px] lg:text-sm md:w-[200px] lg:w-1/2">
              <p className="font-semibold">Since: </p>
              <p>{authUser?.createdAt?.split("T")[0] || "Season 1 member"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
