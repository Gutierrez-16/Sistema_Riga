import React, { useState, useEffect } from "react";

import apiClient from "../Security/apiClient";

import { jwtDecode } from "jwt-decode";

const DataUsuario = () => {
  const [userData, setUserData] = useState(null);

  function obtenerUsuarioDelToken(token) {
    try {
      // Decodificar el token para obtener el payload
      const decodedToken = jwtDecode(token);

      // Extraer y retornar la información del usuario (suponiendo que está bajo la clave 'usuario')
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

        console.log(usuario);

        const data = await apiClient.get(
          `http://localhost:8080/data/${usuario}`
        );
        setUserData(data);
        console.log(token);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    obtenerUsuario();
  }, []); // El array vacío como segundo argumento asegura que useEffect se ejecute solo una vez

  return (
    <div>
      <h2>Datos del Usuario</h2>
      {userData && (
        <ul>
          <li>ID Usuario: {userData.idUsuario}</li>
          <li>Nombre: {userData.nombre}</li>
          <li>Apellido: {userData.apePaterno}</li>
          {/* Agrega aquí más elementos según los datos que esperas recibir */}
        </ul>
      )}
    </div>
  );
};

export default DataUsuario;