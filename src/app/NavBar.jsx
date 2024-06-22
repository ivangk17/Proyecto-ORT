"use client";
import Logo from "./Logo";
import MenuList from "./MenuList";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const { token, setToken, user, setUser } = useAuth();
  const [itemsNav, setItemsNav] = useState([
    { url: "/", texto: "Publicaciones" },
    { url: "/quienes-somos", texto: "¿Quienes Somos?" },
    { url: "/contacto", texto: "Contacto" },
    { url: "/faq", texto: "FAQ" },
    { url: "/signup", texto: "Registrate"}
  ]);

  const updateMenuItems = (user) => {
    if (user && user.role) {
      if (user.role === 'admin') {
        setItemsNav([
          { url: "/panel/validadas", texto: "Publicaciones validadas" },
          { url: "/panel/novalidadas", texto: "Publicaciones no validadas" },
        ]);
      } else {
        setItemsNav([
          { url: "/", texto: "Publicaciones" },
          { url: "/perfil", texto: "Mi publicacion" },
        ]);
      }
    }
  };

  useEffect(() => {
    if (token) {
      const user = JSON.parse(sessionStorage.getItem('user'));
      updateMenuItems(user);
    } else {
      setItemsNav([
        { url: "/", texto: "Publicaciones" },
        { url: "/quienes-somos", texto: "¿Quienes Somos?" },
        { url: "/contacto", texto: "Contacto" },
        { url: "/faq", texto: "FAQ" },
        { url: "/signup", texto: "Registrate"}
      ]);
    }
  }, [token]);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setItemsNav([
      { url: "/", texto: "Publicaciones" },
      { url: "/quienes-somos", texto: "¿Quienes Somos?" },
      { url: "/contacto", texto: "Contacto" },
      { url: "/faq", texto: "FAQ" },
      { url: "/signup", texto: "Registrate"}
    ]);
  };

  return (
    <header className="w-full h-20 flex items-center justify-between shadow-sm bg-neutral-900 sticky top-0 z-50">
      <Logo />
      <nav>
        <MenuList itemsNav={itemsNav} />
      </nav>
      <div className="flex justify-end gap-5">
        {token ? (
          <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Logout
          </button>
        ) : (
          <Link href="/login" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Login
          </Link>
        )}
      </div>
    </header>
  );
}
