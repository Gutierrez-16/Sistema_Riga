package com.sistema.riga.sistema_riga_backend.models;

import lombok.Data;

import java.sql.Timestamp;
import java.util.List;

@Data
public class ComprobanteModel {
    private int idVenta;
    private Timestamp fechaVenta;
    private double descuento;
    private double igv;
    private double total;
    private double subTotal;
    private double totalDescuento;
    private String tipoComprobante;
    private String numero;
    private  String serie;
    private int idCliente;
    private String nomCli;
    private String docCli;
    private String direccion;
    private int idPedido;
    private List<DetallePedidosModel> detallesPedido;
    private String nombreMetodo;
}
