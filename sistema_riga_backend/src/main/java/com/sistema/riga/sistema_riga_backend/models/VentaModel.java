package com.sistema.riga.sistema_riga_backend.models;

import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
public class VentaModel {
    private int idVenta;
    private Timestamp fechaVenta;
    private double descuento;
    private double igv;
    private double total;
    private double subtotal;
    private double totalDescuento;
    private double totalPagar;
    private String tipoComprobante;
    private String estadoVenta;
    private String empleados;
    private String clientes;
    private int idCliente;
    private int idPedido;
    private int idUsuario;
    private int idMetodoPago;
}