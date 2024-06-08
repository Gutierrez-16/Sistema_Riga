package com.sistema.riga.sistema_riga_backend.models;

import lombok.Data;

@Data
public class DetallePedidoModel {
    private int cantidad;
    private double precio;
    private int idProducto;
    private int idUsuario;
}
