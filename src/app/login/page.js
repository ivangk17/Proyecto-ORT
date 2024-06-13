"use client";
import { useState } from 'react';
import Login from "../login/Login";
import Signup from "../signup/Signup";
import Image from "next/image";
export default function PageLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const switchToSignup = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  return (
    <div className="w-full h-full">
      <div className="flex flex-row w-full h-full">
        <div className="lg:w-3/4 md:w-2/4 sm:block hidden relative">
          <div className="w-full h-full">
            <Image
              src="/img/eduwave_login.jpg" 
              className="w-full h-full object-cover"
              layout="fill"
              priority
              style={{ filter: "opacity(0.7)" }}
            />
          </div>
        </div>
        <div className="lg:w-1/4 md:w-2/4 sm:w-full w-full">
          {isLogin ? (
            <Login switchToSignup={switchToSignup} />
          ) : (
            <Signup switchToLogin={switchToLogin} />
          )}
        </div>
      </div>
    </div>
  );
}
