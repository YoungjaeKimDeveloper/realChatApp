import { create } from "zustand";
import axiosInstance from "../../lib/axiosInstance";
import { toast } from "react-toastify";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  // State
  users: null,
  selectedUser: null,
  messages: [],
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

      toast.success(" BEEN SENT TO ❤️");
    } catch (error) {
      console.error(
        `"FAILED TO SEND MESSAGE ❌ : ${error?.response?.data?.message}"`
      );
    } finally {
    }
    set({ isSendingMessage: false });
  },
  getMessages: async (userId) => {
    try {
      set({ isLoadingConversation: true });
      const res = await axiosInstance.get(
        `/message/conversation/${userId._id}`
      );
      if (res.status === 200) {
        set({ messages: res.data.conversation });
        get().listeningRealTimeMessage();
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
  listeningRealTimeMessage: () => {
    console.log("메세지를 실시간으로 듣습니다");
    const { selectedUser } = get();

    const socket = useAuthStore.getState().clientSocket;
    socket.off("Newmessage");
    // tood : optimize this one later
    console.log("ListeningREalItmeMessage", socket);
    socket.on("Newmessage", (newMessage) => {
      console.log("뉴 메세지를받았습니다");
      // if (newMessage.senderId !== selectedUser._id) return;
      set((state) => ({
        messages: [...state.messages, newMessage],
      }));
    });
  },
  unListeningRealTimeMessage: () => {
    const socket = useAuthStore.getState().clientSocket;
    socket.off("newMessage");
  },
  selectUser: (user) => {
    set({ selectedUser: user });
  },
  unSelectUser: () => {
    set({ selectedUser: null });
  },
}));
