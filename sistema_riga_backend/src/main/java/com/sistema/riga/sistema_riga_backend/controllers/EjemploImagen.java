package com.sistema.riga.sistema_riga_backend.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.*;
import java.sql.*;
import org.springframework.http.MediaType;

@RestController
@RequestMapping
@CrossOrigin(origins = "http://localhost:5173")
public class EjemploImagen {

    static String db = "TEST";
    static String usuario = "Riga";
    static String password = "databaseriga";

    public static void insertarImagen(byte[] imagenBytes) {

        String url = "jdbc:sqlserver://localhost:1433;"
                + "databaseName="+db+";"
                + "user="+usuario+";"
                + "password="+password+";"
                + "encrypt=true;"
                + "trustServerCertificate=true;";

        try (Connection con = DriverManager.getConnection(url, usuario, password)) {
            String query = "INSERT INTO IMG (imagen) VALUES (?)";
            try (PreparedStatement pstmt = con.prepareStatement(query)) {
                pstmt.setBytes(1, imagenBytes);
                pstmt.executeUpdate();
                System.out.println("Imagen insertada correctamente en la base de datos.");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @PostMapping("/subir")
    public void subirImagen(@RequestParam("file") MultipartFile file) {
        try {
            byte[] bytes = file.getBytes();
            insertarImagen(bytes); // Cambia "1" por el ID de la imagen que desees
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @GetMapping(value = "/imagenMostrar", produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody byte[] obtenerImagen() {
        byte[] imagenBytes = null;
        String url = "jdbc:sqlserver://localhost:1433;"
                + "databaseName="+db+";"
                + "user="+usuario+";"
                + "password="+password+";"
                + "encrypt=true;"
                + "trustServerCertificate=true;";

        try (Connection con = DriverManager.getConnection(url, usuario, password)) {
            String query = "SELECT imagen FROM IMG";
            try (PreparedStatement pstmt = con.prepareStatement(query)) {
                try (ResultSet rs = pstmt.executeQuery()) {
                    if (rs.next()) {
                        imagenBytes = rs.getBytes("imagen");
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return imagenBytes;
    }
}