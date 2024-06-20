"use client";
import Logo from "./Logo";
import MenuList from "./MenuList";
import Link from "next/link";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [itemsNav, setItemsNav] = useState([
    { url: "/", texto: "Publicaciones" },
    { url: "/quienes-somos", texto: "¿Quienes Somos?" },
    { url: "/contacto", texto: "Contacto" },
    { url: "/faq", texto: "FAQ" },
    { url: "/signup", texto: "Registrate"}
  ]);
  

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if(token){
        setIsLoggedIn(true);
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user && user.role) {
            if (user.role === 'admin') {
            setItemsNav([
                { url: "/panel/validadas", texto: "Publicaciones validadas" },
                { url: "/panel/novalidadas", texto: "Publicaciones no validadas" },
            ]);
            } else {
            setItemsNav([
                { url: "/", texto: "Publicaciones" },
                { url: "/perfil/mipublicacion", texto: "Mis Publicaciones" },
            ]);
            }
      }
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <header className="bg-white dark:bg-gray-900">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Logo />
        <div className="flex flex-1 items-center justify-end md:justify-between">
          <MenuList menuItems={itemsNav} />
        </div>
        <div className="flex items-center gap-4">
          <div className="sm:flex sm:gap-4">
            {isLoggedIn ? (
              <button 
                onClick={handleLogout} 
                className="block rounded-md bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 dark:hover:bg-red-500"
              >
                Logout
              </button>
            ) : (
              <Link href="/login" className="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700 dark:hover:bg-teal-500">
                  Login
              </Link>
            )}
          </div>
          <button
            className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
          >
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
