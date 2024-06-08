package com.sistema.riga.sistema_riga_backend.models;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PedidoModel {
    private int idPedido;
    private LocalDateTime fechaPedido;
    private String estadoPedido;
}

