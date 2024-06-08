package com.sistema.riga.sistema_riga_backend.models;

import lombok.Data;

@Data
public class UsuarioModel {
    private long iDUsuario;
    private String username;
    private String password;
    private String estadoUsuario;
    private int idEmpleado;
    private int idTipoUsuario;
}
