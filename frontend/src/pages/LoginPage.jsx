import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
const LoginPage = () => {
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showText, setShowText] = useState(false);
  const toggleEyes = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleText = () => {
    setShowText((prev) => !prev);
  };
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const handleLogin = (e) => {
    e.preventDefault();
    login(loginInfo);
  };
  return (
    <div className="my-201 m-auto my-20 flex h-[700px] w-4/5 items-center justify-center bg-red-50 rounded-2xl">
      <div className="flex w-full justify-between gap-x-4 h-full">
        {/* Login Info */}
        <div className="w-full lg:w-1/2   h-full flex items-center justify-center rounded-2xl flex-col bg-green-50">
          <div className="w-full flex flex-col items-center justify-center gap-y-1  h-full">
            <h1 className=" text-4xl tracking-wider mb-10 animate-bounce font-black ">
              Welcome Back
            </h1>
            <form
              className="flex flex-col items-center justify-center gap-y-4 w-full"
              onSubmit={handleLogin}
            >
              <input
                type="text"
                placeholder="welcome@gmail.com"
                className="input w-full max-w-xs h-20 bg-green-100"
                value={loginInfo.email}
                onChange={(e) =>
                  setLoginInfo((prev) => ({ ...prev, email: e.target.value }))
                }
              />
              <div className="w-full max-w-xs relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="******"
                  className="input w-full max-w-xs h-20 bg-green-100"
                  value={loginInfo.password}
                  onChange={(e) =>
                    setLoginInfo((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
                {showPassword ? (
                  <Eye
                    className="absolute top-[35%] right-2 cursor-pointer transition-all "
                    onClick={toggleEyes}
                  />
                ) : (
                  <EyeClosed
                    className="absolute top-[35%] right-2 cursor-pointer transition-all"
                    onClick={toggleEyes}
                  />
                )}
              </div>
              <button
                className="btn btn-wide tracking-wider bg-green-200 border-none"
                type="submit"
              >
                login
              </button>
            </form>
            <Link
              to={"/signup"}
              className="mt-10 flex flex-col items-center gap-y-4"
            >
              <p>Do you want to join today?</p>
              <p className="font-semibold tracking-wider underline text-sm text-pink-200">
                Join Today
              </p>
            </Link>
          </div>
        </div>
        {/* Right Pic */}
        <div
          className="w-1/2  rounded-2xl relative transition-all duration-700  hidden lg:block"
          onMouseEnter={toggleText}
          onMouseLeave={toggleText}
        >
          <img
            src="../../public/community.jpg"
            alt="right-back-image"
            className={`w-full h-full  object-cover p-4 rounded-2xl ${showText && "opacity-50 grayscale"} transition-all duration-700 `}
          />

          <p
            className={`absolute inset-0 flex items-center justify-center text-2xl transition-all duration-700 ${!showText && "opacity-0"} text-4xl text-pink-300`}
          >
            We are Together!
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
