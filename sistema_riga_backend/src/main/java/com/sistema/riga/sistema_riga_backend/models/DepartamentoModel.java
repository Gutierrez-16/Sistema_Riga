package com.sistema.riga.sistema_riga_backend.models;

import lombok.Data;

@Data
public class DepartamentoModel {
    private long idDepartamento;
    private String nombreDepartamento;
    private boolean estadoDepartamento;
}