"use client";
import { useState, useEffect } from "react";

export default function PageDetails({ params }) {
  const { id } = params;
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/ORT-PabloFernandez/PNTP2-REACT-EJEMPLO/main/src/data/Users.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setUser(data.find((user) => user["Object Id"] === id));
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <img src={user.Picture} alt={user.UserName} />
      <h3>{user["Display name"]}</h3>
      <h3>{user["Country/Region"]}</h3>
    </>
  );
}
