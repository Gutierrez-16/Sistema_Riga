package com.sistema.riga.sistema_riga_backend.models;

import lombok.Data;

import java.util.Date;

@Data
public class PersonaModel {
    private long idPersona;
    private String dni;
    private String nombrePersona;
    private String ApePaterno;
    private String ApeMaterno;
    private char genero;
    private Date fechaNac;
    private String correo;
    private String celular;
    private String direccion;
    private boolean estadoPersona;
    private long idDistrito;
}
