package com.sistema.riga.sistema_riga_backend.models;

import lombok.Data;

@Data
public class UsuarioModel {
    private long iDUsuario;
    private String logeo;
    private String clave;
    private String estadoUsuario;
}
