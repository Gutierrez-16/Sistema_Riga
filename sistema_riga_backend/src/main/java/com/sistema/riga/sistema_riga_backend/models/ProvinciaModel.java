package com.sistema.riga.sistema_riga_backend.models;

import lombok.Data;

@Data
public class ProvinciaModel {
    private long idProvincia;
    private String nombreProvincia;
    private boolean estadoProvincia;
    private long idDepartamento;
}