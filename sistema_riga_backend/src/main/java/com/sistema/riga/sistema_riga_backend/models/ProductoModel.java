package com.sistema.riga.sistema_riga_backend.models;

import lombok.Data;

@Data
public class ProductoModel {
    private int idProducto;
    private String nombreProd;
    private double precioUnit;
    private byte[] imagen;
    private String descripcion;
    private String estadoProducto;
    private int idCategoria;
    private int idUnidadMedida;
    private int idLinea;
    private int idMarca;
}
