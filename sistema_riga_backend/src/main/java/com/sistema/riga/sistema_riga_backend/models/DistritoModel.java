package com.sistema.riga.sistema_riga_backend.models;

import lombok.Data;

@Data
public class DistritoModel {
    private long idDistrito;
    private String nombreDistrito;
    private boolean estadoDistrito;
    private long idProvincia;
}