import { create } from "zustand";
import axiosInstance from "../../lib/axiosInstance";
import { toast } from "react-toastify";

export const useChatStore = create((set) => ({
  // State
  users: null,
  selectedUser: null,
  messages: [],
  // State - Loading
  isUserLoading: false,
  // Action
  getUsers: async () => {
    try {
      set({ isUserLoading: true });
      const response = await axiosInstance.get("/message/users");
      if (response.status === 200) {
        set({ users: response.data.users });
      }
      toast.success("FETCHING USERS ✅");
    } catch (error) {
      set({ users: null });
      console.error("FAILED TO FETCH USERS", error?.response?.data?.message);
      toast.error("FAEILD TO GET USERS ❌", error?.response?.data?.message);
    } finally {
      set({ isUserLoading: false });
    }
  },
  sendMessage: async (selectedUser, message) => {
    try {
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        message
      );
      
    } catch (error) {}
  },
  selectUser: (user) => {
    set({ selectedUser: user });
  },
  unSelectUser: () => {
    set({ selectedUser: null });
  },
}));
