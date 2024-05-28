package com.sistema.riga.sistema_riga_backend.models;

import lombok.Data;

@Data
public class MetodoPagoModel {
    private int idMetodo;
    private String nombreMetodo;
    private String estadoMetodo;
}