"use client";
import { useState, useEffect } from "react";
import { handlerSignup } from "./handlerSignup";
import SignupForm from "./SignupForm";
import BackgroundImage from "./BackgroundImage";
import { useAuth } from "../../context/AuthContext";

export default function SignupPage() {
  const [error, setError] = useState(null);
  const {user, token} = useAuth();

  if (token || user) {
    window.location.href = '/';
    return null;
  } 

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const nuevoUsuario = {
      username: `${formData.get("firstName")} ${formData.get("lastName")}`,
      email: formData.get("email"),
      password: formData.get("password"),
    };
    await handlerSignup(nuevoUsuario, setError);
  };

  return (
    <div className="w-full h-full">
      <div className="flex flex-row w-full h-full">
        <BackgroundImage />
        <SignupForm handleSubmit={handleSubmit} error={error} />
      </div>
    </div>
  );
}