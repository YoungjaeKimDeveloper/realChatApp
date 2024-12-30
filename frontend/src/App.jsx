import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useAuthStore } from "./store/useAuthStore.js";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

// Pages[S]
import ProfilePage from "./pages/ProfilePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
// Pages[E]

import { Home, Loader } from "lucide-react";

const App = () => {
  const { checkAuth, authUser, isAuthLoading } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isAuthLoading && !authUser) {
    return (
      <div className="flex h-screen w-full items-center justify-center  ">
        <Loader className="size-24 animate-spin" />
      </div>
    );
  }
  // if (!authUser) {
  //   return <p>Bug</p>;
  // }
  console.log("AUTH USER", authUser?._id);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
