package com.sistema.riga.sistema_riga_backend.models;

import lombok.Data;

@Data
public class DistritoModel {
    private int idDistrito;
    private String nombreDistrito;
    private String estadoDistrito;
    private long idProvincia;
}