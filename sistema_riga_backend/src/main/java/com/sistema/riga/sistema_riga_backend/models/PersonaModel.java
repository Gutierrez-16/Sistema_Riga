package com.sistema.riga.sistema_riga_backend.models;

import lombok.Data;

import java.util.Date;

@Data
public class PersonaModel {
    long idPersona;
    String dni;
    String nombrePersona;
    String ApePaterno;
    String ApeMaterno;
    char genero;
    Date fechaNac;
    String correo;
    String celular;
    String direccion;
    String estadoCivil;
    long idDistrito;
}
