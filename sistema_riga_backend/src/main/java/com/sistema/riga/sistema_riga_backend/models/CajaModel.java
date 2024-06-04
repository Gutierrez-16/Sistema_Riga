package com.sistema.riga.sistema_riga_backend.models;

import lombok.Data;

import java.util.Date;

@Data
public class CajaModel {
    private int idCaja;
    private String descripcion;
    private Date fechaApertura;
    private Date fechaCierre;
    private double montoInicial;
    private double montoFinal;
    private char estadoCaja;
    private int idUsuario;
}
