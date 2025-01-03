import React, { useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Pencil, LoaderCircle } from "lucide-react";
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
    <div className="mx-auto flex h-[600px] w-full items-center justify-center px-4 lg:w-1/2">
      <div className="mx-4 mt-20 h-full w-full rounded-xl bg-green-100 lg:w-3/4">
        <div className="my-4 flex flex-col items-center justify-between text-center font-mono">
          <h1 className="text-2xl font-semibold text-green-400">Profile</h1>
          <p className="font-semibold text-green-300">
            Your profile information
          </p>
          {isProfileUploading ? (
            <LoaderCircle className="size-20 animate-spin" />
          ) : (
            <div className="relative mt-4">
              <img
                src={authUser.profilePic || "../../public/avartar.png"}
                alt="profileImg"
                accept="image/*"
                className="size-32 rounded-full"
              />
              <label className="absolute right-0 top-20 z-20 rounded-2xl bg-green-50 p-2">
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

          <div className="mt-10 flex w-full flex-col items-center gap-y-4 px-4">
            <p>Click the pencil to Update the Photo</p>
            {/* User Info */}
            <div className="flex w-full rounded-xl border-2 border-solid border-green-500 px-2 py-4 text-[7px] text-sm sm:w-[300px] lg:w-1/2 lg:text-sm">
              <p className="font-semibold">Name: </p>
              <p>{authUser.fullName}</p>
            </div>
            <div className="flex w-full rounded-xl border-2 border-solid border-green-500 px-2 py-4 text-[7px] text-sm sm:w-[300px] lg:w-1/2 lg:text-sm">
              <p className="font-semibold">Email: </p>
              <p>{authUser.email}</p>
            </div>
            <div className="flex w-full rounded-xl border-2 border-solid border-green-500 px-2 py-4 text-[13px] sm:w-[300px] lg:w-1/2 lg:text-sm">
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
