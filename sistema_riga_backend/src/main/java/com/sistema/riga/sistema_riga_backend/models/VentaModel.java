package com.sistema.riga.sistema_riga_backend.models;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class VentaModel {
    private int idVenta;
    private LocalDateTime fechaVenta;
    private double descuento;
    private double igv;
    private double total;
    private double subtotal;
    private double totalDescuento;
    private double totalPagar;
    private char tipoComprobante;
    private char estadoVenta;
    private int idCliente;
    private int idPedido;
    private int idUsuario;
    private int idMetodoPago;
}