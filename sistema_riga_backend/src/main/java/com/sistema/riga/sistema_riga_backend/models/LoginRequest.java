package com.sistema.riga.sistema_riga_backend.models;

import lombok.Data;

@Data
public class LoginRequest {
    private long idUsuario;
    private String username;
    private String password;
}
