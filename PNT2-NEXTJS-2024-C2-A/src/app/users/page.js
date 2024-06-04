"use client";
import { useState, useEffect } from "react";
import UserList from "./UserList";
//https://raw.githubusercontent.com/ORT-PabloFernandez/PNTP2-REACT-EJEMPLO/main/src/data/Users.json

export default function UserPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/ORT-PabloFernandez/PNTP2-REACT-EJEMPLO/main/src/data/Users.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <UserList Users={users} />
    </>
  );
}
