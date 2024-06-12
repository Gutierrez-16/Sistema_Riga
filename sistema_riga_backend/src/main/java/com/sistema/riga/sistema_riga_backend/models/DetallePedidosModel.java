package com.sistema.riga.sistema_riga_backend.models;

import lombok.Data;

@Data
public class DetallePedidosModel {
    private String nomProducto;
    private int cant;
    private double precioUnitario;
    private double totalPro;
}
