"use client";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { handlerLogin } from "./handlerLogin";
import { useAuth } from '../../context/AuthContext';


export default function PageLogin() {
  const [error, setError] = useState(null);
  const { token, setToken, user, setUser } = useAuth();
  const [inicio, setInicio] = useState(false);

  useEffect(() => { 
    if (token) {
      const usuario = JSON.parse(user);
      let vista;
      if(usuario.role === 'admin'){
        vista = '/panel';
      } else {
        vista = '/perfil';
      }
      redirect(vista);
    } 
  }, [token, user, inicio]);
 

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const usuario = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    await handlerLogin(usuario, setInicio, setError, setToken, setUser);
  };

  if (token) {
    return null;
  }
  


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
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto rounded-full"
            src="img/logo_edu_wave.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Inicia sesión en tu cuenta
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit} method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Contraseña
                </label>
                {/* <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div> */}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Iniciar sesión
              </button>
            </div>
          </form>
          {error && (
              <>
              <div className="text-red-500 text-sm mt-2">
                  {error}
                </div>
                <p className="mt-10 text-center text-sm text-gray-500">
                  <Link href={'/signup'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"> 
                    No tenes cuenta todavia?
                    Regístrate acá
                  </Link>
                </p>
              </>
              )}
        </div>
      </div>
        </div>
      </div>
    </div>
  );
}
