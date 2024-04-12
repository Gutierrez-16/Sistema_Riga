package com.sistema.riga.sistema_riga_backend.models;

import lombok.Data;

@Data
public class UsuarioModel {
    private long idUsuario;
    private String username;
    private String password;
}
