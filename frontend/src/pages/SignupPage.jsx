import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
const LoginPage = () => {
  // From Auth Store
  const { signup, isSignupLoading } = useAuthStore();
  // UseState
  const [showPassword, setShowPassword] = useState(false);
  const [showText, setShowText] = useState(false);
  // Action
  const toggleEyes = () => {
    setShowPassword((prev) => !prev);
  };
  const toggleText = () => {
    setShowText((prev) => !prev);
  };

  const [signupInfo, setSignupInfo] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleSignup = (e) => {
    e.preventDefault();
    signup(signupInfo);
  };

  return (
    <div className="my-201 m-auto my-20 flex h-[700px] w-4/5 items-center justify-center rounded-2xl bg-red-50">
      <div className="flex h-full w-full justify-between gap-x-4">
        {/* Right Pic */}
        <div
          className="relative hidden w-1/2 rounded-2xl transition-all duration-700 lg:block"
          onMouseEnter={toggleText}
          onMouseLeave={toggleText}
        >
          <img
            src="../../public/community.jpg"
            alt="right-back-image"
            className={`h-full w-full rounded-2xl object-cover p-4 ${showText && "opacity-50 grayscale"} transition-all duration-700`}
          />

          <p
            className={`absolute inset-0 flex items-center justify-center text-2xl transition-all duration-700 ${!showText && "opacity-0"} text-4xl text-pink-300`}
          >
            We are Together!
          </p>
        </div>
        {/* Login Info */}
        <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl bg-green-50 lg:w-1/2">
          <div className="flex h-full w-full flex-col items-center justify-center gap-y-1 text-center">
            <h1 className="mb-10 animate-bounce text-2xl font-black tracking-wider md:text-4xl">
              Let's Be Together
            </h1>
            <form
              className="flex w-full flex-col items-center justify-center gap-y-4"
              onSubmit={handleSignup}
            >
              <input
                type="text"
                placeholder="Funll Name"
                className="input h-20 w-full max-w-xs bg-green-100"
                value={signupInfo.fullName}
                onChange={(e) =>
                  setSignupInfo((prev) => ({
                    ...prev,
                    fullName: e.target.value,
                  }))
                }
              />
              <input
                type="email"
                placeholder="welcome@gmail.com"
                className="input h-20 w-full max-w-xs bg-green-100"
                value={signupInfo.email}
                onChange={(e) =>
                  setSignupInfo((prev) => ({ ...prev, email: e.target.value }))
                }
              />
              <div className="relative w-full max-w-xs">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  className="input h-20 w-full max-w-xs bg-green-100"
                  value={signupInfo.password}
                  onChange={(e) =>
                    setSignupInfo((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
                {showPassword ? (
                  <Eye
                    className="absolute right-2 top-[35%] cursor-pointer transition-all"
                    onClick={toggleEyes}
                  />
                ) : (
                  <EyeClosed
                    className="absolute right-2 top-[35%] cursor-pointer transition-all"
                    onClick={toggleEyes}
                  />
                )}
              </div>
              <button
                className="btn btn-wide border-none bg-green-200 tracking-wider"
                type="submit"
                disabled={isSignupLoading}
              >
                {isSignupLoading ? "Signing..." : "Sign up"}
              </button>
            </form>
            <Link
              to={"/login"}
              className="mt-10 flex flex-col items-center gap-y-4"
            >
              <p>Are you member with us?</p>
              <p className="text-sm font-semibold tracking-wider text-pink-200">
                Login Page
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
