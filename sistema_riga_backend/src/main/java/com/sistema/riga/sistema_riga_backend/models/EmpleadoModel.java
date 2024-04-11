package com.sistema.riga.sistema_riga_backend.models;

import lombok.Data;

@Data
public class EmpleadoModel {
    private long idCliente;
    private double salario;
    private long iDPersona;
    private long idCargo;
    private long idUsuario;
}