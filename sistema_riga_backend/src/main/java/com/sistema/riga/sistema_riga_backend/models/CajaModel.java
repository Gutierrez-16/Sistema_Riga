package com.sistema.riga.sistema_riga_backend.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class CajaModel {
    private int idCaja;
    private String descripcion;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
    private Timestamp fechaApertura;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm")
    private Timestamp fechaCierre;

    private double montoInicial;
    private double montoFinal;
    private String estadoCaja;
    private int idUsuario;
}
