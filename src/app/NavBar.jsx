"use client";
import Logo from "./Logo";
import MenuList from "./MenuList";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

export default function NavBar() {
  const { token, user, setToken, setUser } = useAuth();
  const [itemsNav, setItemsNav] = useState([
    { url: "/", texto: "Publicaciones" },
    { url: "/quienes-somos", texto: "¿Quienes Somos?" },
    { url: "/faq", texto: "FAQ" },
    { url: "/signup", texto: "Registrate" }
  ]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const updateMenuItems = (user) => {
    if (user && user.role) {
      if (user.role === 'admin') {
        setItemsNav([
          { url: "/panel", texto: "Panel" },
          { url: "/", texto: "Publicaciones activas" },
          { url: "/panel/no-validadas", texto: "Publicaciones no validadas" },
          { url: "/panel/rechazadas", texto: "Publicaciones rechazadas" },
        ]);
      } else {
        setItemsNav([
          { url: "/", texto: "Publicaciones" },
          { url: "/perfil", texto: "Mi publicacion" },
          { url: "/quienes-somos", texto: "¿Quienes Somos?" },
          { url: "/faq", texto: "FAQ" }
        ]);
      }
    }
  };

  useEffect(() => {
    if (token) {
      const usuario = JSON.parse(user);
      updateMenuItems(usuario);
    } else {
      setItemsNav([
        { url: "/", texto: "Publicaciones" },
        { url: "/quienes-somos", texto: "¿Quienes Somos?" },
        { url: "/faq", texto: "FAQ" },
        { url: "/signup", texto: "Registrate" },
        { url: "/agradecimientos", texto: "Agradecimientos" }
      ]);
    }
  }, [token, user]);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setItemsNav([
      { url: "/", texto: "Publicaciones" },
      { url: "/quienes-somos", texto: "¿Quienes Somos?" },
      { url: "/faq", texto: "FAQ" },
      { url: "/signup", texto: "Registrate" }
    ]);
    window.location.href = "/login";
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const isProfileDisabled = true; 
  const isSettingsDisabled = true; 

  return (
    <header className="bg-white dark:bg-gray-900">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Logo />
        <div className="flex flex-1 items-center justify-end md:justify-between">
          <MenuList menuItems={itemsNav} />
        </div>
        <div className="flex items-center gap-4 relative">
          {token && user ? (
            <div className="relative">
              <button 
                onClick={toggleDropdown} 
                className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mr-4 focus:outline-none"
              >
                {JSON.parse(user).username}
                <svg
                  className={`ml-2 h-4 w-4 transition-transform ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06 0L10 10.586l3.71-3.376a.75.75 0 111.08 1.04l-4 4.5a.75.75 0 01-1.08 0l-4-4.5a.75.75 0 010-1.04z" clipRule="evenodd" />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                  {isProfileDisabled ? (
                    <div
                      className="relative flex items-center px-4 py-2 text-sm text-gray-400 cursor-not-allowed"
                      onMouseEnter={() => setTooltipVisible(true)}
                      onMouseLeave={() => setTooltipVisible(false)}
                    >
                      <FaUser className="mr-2" />
                      Perfil
                      {tooltipVisible && (
                        <div className="absolute left-full ml-2 w-48 bg-gray-700 text-white text-xs rounded py-1 px-2 shadow-lg">
                          Funcionalidad en desarrollo
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <FaUser className="mr-2" />
                      Perfil
                    </Link>
                  )}
                  {isSettingsDisabled ? (
                    <div
                      className="relative flex items-center px-4 py-2 text-sm text-gray-400 cursor-not-allowed"
                      onMouseEnter={() => setTooltipVisible(true)}
                      onMouseLeave={() => setTooltipVisible(false)}
                    >
                      <FaCog className="mr-2" />
                      Configuración
                      {tooltipVisible && (
                        <div className="absolute left-full ml-2 w-48 bg-gray-700 text-white text-xs rounded py-1 px-2 shadow-lg">
                          Funcionalidad en desarrollo
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link href="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <FaCog className="mr-2" />
                      Configuración
                    </Link>
                  )}
                  <div className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={handleLogout}>
                    <FaSignOutAlt className="mr-2" />
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : null}
          <div className="sm:flex sm:gap-4">
            {token ? null : (
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
