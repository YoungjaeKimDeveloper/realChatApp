import { create } from "zustand";
import axiosInstance from "../../lib/axiosInstance";
import { toast } from "react-toastify";
import { io } from "socket.io-client";

const Server_URL = "http://localhost:5005";

export const useAuthStore = create((set, get) => ({
  // State
  authUser: null,
  onlineUsers: null,
  // State - socket.io
  clientSocket: null,
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
      get().connectSocket();
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
      get().connectSocket();
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
      get().disconnectSocket();
    } catch (error) {
      console.error("FAILED TO LOGOUT", error?.response?.data?.message);
      toast.error("FAILED TO LOGOUT", error?.response?.data?.message);
      set({ authUser: null });
    }
  },

  checkAuth: async () => {
    try {
      set({ isAuthLoading: true });
      const responseFromServer = await axiosInstance.get("/auth/checkAuth");
      set({ authUser: responseFromServer.data.user });
      get().connectSocket();
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
  // socket functions
  connectSocket: async () => {
    console.log("AUTHUSER:", get().authUser._id);
    try {
      const { authUser, clientSocket } = get();
      if (clientSocket?.connected) return; // 이미 연결된 경우
      const socket = io(Server_URL, {
        query: {
          userID: authUser._id,
        },
      });
      // socket을 상태에 저장
      socket.connect();

      set({ clientSocket: socket });

      // clientSocket이 정상적으로 초기화된 후에 이벤트 리스너 설정
      socket.on("updateOnlineUsersID", (onlineUserIDS) => {
        console.info("Online Users: ", onlineUserIDS);
        set({ onlineUsers: onlineUserIDS });
      });
    } catch (error) {
      set({ clientSocket: null });
      console.error("FAILED TO CONNECT SOCKET❌ : ", error.message);
    }
  },
  disconnectSocket: async () => {
    try {
      console.log("DISCONNECT THE SOCKET FROM SERVER");
      get().clientSocket.disconnect();
      if (get().clientSocket?.disconnected) {
        set({ clientSocket: null });
        socket.on("disconnect", () => {
          console.info("DISICONNECT THE SOCKET SUCCESSFULLY✅");
        });
      }
    } catch (error) {
      console.error("FAILED TO DISCONNECT SOCKET ❌", error?.message);
    }
  },
}));
