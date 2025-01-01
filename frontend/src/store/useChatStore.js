import { create } from "zustand";
import axiosInstance from "../../lib/axiosInstance";
import { toast } from "react-toastify";

export const useChatStore = create((set, get) => ({
  // State
  users: null,
  selectedUser: null,
  messages: [],
  conversations: null,
  // State - Loading
  isUserLoading: false,
  isLoadingConversation: false,
  isSendingMessage: false,
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
  // Sending Message Fuck you
  sendMessage: async (newMessage) => {
    try {
      set({ isSendingMessage: true });
      const { selectedUser } = get();
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        newMessage
      );
      if (res.status === 200) {
        set((state) => [...state.messages, newMessage]);
      }
      toast.success("MESSAGE HAS BEEN SENT TO ❤️");
    } catch (error) {
      console.error(
        `"FAILED TO SEND MESSAGE ❌ : ${error?.response?.data?.message}"`
      );
    } finally {
    }
    set({ isSendingMessage: false });
  },
  getConverstaion: async () => {
    const { selectedUser } = get();
    console.log("SELECTED USER : ", selectedUser._id);
    try {
      set({ isLoadingConversation: true });
      const res = await axiosInstance.get(
        `/message/conversation/${selectedUser._id}`
      );
      if (res.status === 200) {
        set({ conversations: res.data.conversation });
        toast.success(`SUCCEED TO GET CONVERSATION✅`);
      }
    } catch (error) {
      console.error(
        `FAILED TO GET CONVERSATION: ❌ ${error?.response?.data?.message}`
      );
      toast.error(
        `FAILED TO GET CONVERSATION: ❌ ${error?.response?.data?.message}`
      );
    } finally {
      set({ isLoadingConversation: false });
    }
  },
  selectUser: (user) => {
    set({ selectedUser: user });
  },
  unSelectUser: () => {
    set({ selectedUser: null });
  },
}));
