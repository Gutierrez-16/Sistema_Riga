import React, { useState, useEffect } from "react";
import apiClient from "../Security/apiClient";
import { jwtDecode } from "jwt-decode";

const DataUsuario = ({ onUserDataReceived }) => {
  const [userData, setUserData] = useState(null);

  function obtenerUsuarioDelToken(token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.sub;
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return null;
    }
  }

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No se encontró el token en el localStorage");
        }

        const usuario = obtenerUsuarioDelToken(token);

        const data = await apiClient.get(
          `http://localhost:8080/data/${usuario}`
        );
        setUserData(data);
        onUserDataReceived(data); 
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    obtenerUsuario();
  }, [onUserDataReceived]);

  return <div>{/* Renderizado del contenido del usuario */}</div>;
};

export default DataUsuario;
