import { create } from "zustand";
import axiosInstance from "../../lib/axiosInstance";
import { toast } from "react-toastify";
export const useAuthStore = create((set, get) => ({
  // State
  authUser: null,
  // State - Loading Bar
  isAuthLoading: false,
  isLoginLoading: false,
  isSignupLoading: false,
  isProfileUploading: false,
  // Action
  login: async (loginForm) => {
    console.log("LOGINFORM", loginForm);
    try {
      set({ isLoginLoading: true });
      const res = await axiosInstance.post("/auth/login", loginForm);
      set({ authUser: res.data.user });
      toast.success("Welcome Back❤️");
    } catch (error) {
      console.error("FAILED TO LOGIN [C] : ", error);
      toast.error(
        "FAILED TO LOGIN",
        error?.response?.data?.message || "FAILED TO LOGIN"
      );
      set({ authUser: null });
    } finally {
      set({ isLoginLoading: false });
    }
  },
  signup: async (data) => {
    set({ isSignupLoading: true });
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      console.log("백엔드 응답:", response);
      set({ authUser: response.data.newUser });

      toast.success(`Welcome ${response.data.newUser.fullName}`);
    } catch (error) {
      console.log("SIGN UP ERROR", error?.response?.data?.message);
      toast.error(`${error.response.data.message}`);
    } finally {
      set({ isSignupLoading: false });
    }
  },
  logout: async () => {
    try {
      const res = axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("SEE YOU NEXT TIME❤️");
    } catch (error) {
      console.error("FAILED TO LOGOUT", error?.response?.data?.message);
      toast.success("FAILED TO LOGOUT");
      set({ authUser: null });
    }
  },

  checkAuth: async () => {
    try {
      set({ isAuthLoading: true });
      const responseFromServer = await axiosInstance.get("/auth/checkAuth");
      set({ authUser: responseFromServer.data.user });
    } catch (error) {
      console.log(
        "FAILED TO AUTH[C]: ",
        error.response?.data?.message || error.message
      );
      set({ authUser: null });
    } finally {
      set({ isAuthLoading: false });
    }
  },
  updateProfilePic: async (profilePic) => {
    console.log("ProfilePic", profilePic);
    try {
      set({ isProfileUploading: true });
      const res = await axiosInstance.put("/auth/profile-update", {
        profilePic: profilePic,
      });

      set({ authUser: res.data.updatedUser });
      toast.success("Profile Picture Uploaded ✅");
    } catch (error) {
      console.log(error.message);
      console.log("FAILED TO UPLOAD PROFILE", error?.response);
      toast.error("FAILED TO UPLOAD IMAGE ❌");
    } finally {
      set({ isProfileUploading: false });
    }
  },
  //   Check the Auth Function
}));
