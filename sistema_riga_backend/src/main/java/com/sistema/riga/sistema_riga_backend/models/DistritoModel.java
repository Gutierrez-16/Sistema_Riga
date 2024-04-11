package com.sistema.riga.sistema_riga_backend.models;

import lombok.Data;

@Data
public class DistritoModel {
    long idDistrito;
    String nombreDistrito;
    boolean estado;
    long idProvincia;
}
