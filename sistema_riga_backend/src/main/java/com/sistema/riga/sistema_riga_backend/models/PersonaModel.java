package com.sistema.riga.sistema_riga_backend.models;

import lombok.Data;

import java.util.Date;


@Data
public class PersonaModel {
    private int idPersona;
    private String dni;
    private String nombrePersona;
    private String ApePaterno;
    private String ApeMaterno;
    private String genero;
    private Date fechaNac;
    private String correo;
    private String celular;
    private String direccion;
    private String estadoPersona;
    private int idDistrito;

}