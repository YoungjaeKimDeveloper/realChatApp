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
  // Action
  login: async (loginForm) => {
    try {
      set({ isLoginLoading: true });
      const res = await axiosInstance.post("/auth/login", loginForm);
      set({ authUser: res.data.user });
    } catch (error) {
      console.error("FAILED TO LOGIN [C] : ", error.response?.data?.message);
      toast.error(
        "FAILED TO LOGIN",
        error?.response?.data?.message || "FAILED TO LOGIN",
      );
      set({ authUser: null });
    } finally {
      set({ isLoginLoading: false });
    }
  },
  signup: async (data) => {
    try {
      set({ isSignupLoading: true });
      const response = await axiosInstance.post("/auth/signup", data);
      set({ authUser: response.data.user });

      toast.success(`Welcome ${response.data.fullName}`);
    } catch (error) {
      console.error(`FAILED TO LOGIN, ${error.message}`);
      toast.error("FAILED TO signup: ", error.message);
    } finally {
      set({ isSignupLoading: false });
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
        error.response?.data?.message || error.message,
      );
    } finally {
      set({ isAuthLoading: false });
    }
  },
  //   Check the Auth Function
}));
