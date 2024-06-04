package com.sistema.riga.sistema_riga_backend.models;

import lombok.Data;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.Date;

@Data
public class EmpleadoModel {
    private int idEmpleado;
    private double sueldo;
    private Date fechaIng;
    private Time horaEntrada;
    private Time horaSalida;
    private String turno;
    private String estadoEmpleado;
    private int idPersona;
    private int idCargo;
}