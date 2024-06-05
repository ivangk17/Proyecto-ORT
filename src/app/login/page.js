"use client";
import { redirect } from "next/navigation";
import Login from "./Login";
import Image from "next/image";


export default function PageLogin() {
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
          <Login /> 
        </div>
      </div>
    </div>
  );
}
