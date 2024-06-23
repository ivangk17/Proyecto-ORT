"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import TarjetaDashboard from "./tarjetaDarshboard";

export default function PanelPage() {
  const { token, user } = useAuth();
  const [estadistica, setEstadistica] = useState({});

  const fetchPublicaciones = () => {
    fetch(`http://localhost:3000/api/publicaciones/estadistica`, {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setEstadistica(data);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al obtener estadisticas: " + error.message,
        });
        setEstadistica({
          validadas: 0,
          rechazadas: 0,
          noValidadas: 0,
          total: 0,
        });
      });
  };

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
      return null;
    }

    const role = JSON.parse(user).role;
    if (role !== "admin") {
      window.location.href = "/";
      return null;
    }

    if (token) {
      fetchPublicaciones();
    }
  }, [token, user]);

  return (
    <div
      className="min-h-screen flex flex-col justify-between mx-auto max-w-screen-xl bg-center bg-no-repeat overflow-hidden relative"
      style={{
        backgroundImage: `url('/img/eduwave_login.jpg')`,
        backgroundSize: "cover",
      }}
    >
      <div className="min-h-screen flex flex-col justify-between mx-auto max-w-screen-xl bg-center bg-no-repeat overflow-hidden relative">
        <h1 className="text-4xl font-bold text-center mt-8 mb-4 text-white">
          DASHBOARD PUBLICACIONES
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          <TarjetaDashboard
            titulo="En espera validacion"
            link="/panel/no-validadas"
            datos={estadistica.noValidadas}
            clase="bg-yellow-500 bg-opacity-50 p-16 rounded-lg shadow-lg flex flex-col items-center justify-center h-96 w-full"
          />
          <TarjetaDashboard
            titulo="Rechazadas"
            link="/panel/rechazadas"
            datos={estadistica.rechazadas}
            clase="bg-red-500 bg-opacity-50 p-16 rounded-lg shadow-lg flex flex-col items-center justify-center h-96 w-full"
          />
          <TarjetaDashboard
            titulo="Activas"
            link="/"
            datos={estadistica.validadas}
            clase="bg-green-500 bg-opacity-50 p-16 rounded-lg shadow-lg flex flex-col items-center justify-center h-96 w-full"
          />
          <TarjetaDashboard
            titulo="Total"
            link="/panel"
            datos={estadistica.total}
            clase="bg-gray-900 bg-opacity-50 p-16 rounded-lg shadow-lg flex flex-col items-center justify-center h-96 w-full"
          />
        </div>
      </div>
    </div>
  );
}
