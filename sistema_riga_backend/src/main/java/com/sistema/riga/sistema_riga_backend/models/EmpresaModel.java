package com.sistema.riga.sistema_riga_backend.models;


import lombok.Data;

@Data
public class EmpresaModel {
    private int idEmpresa;
    private String ruc;
    private String razonSocial;
    private String direccion;
    private String estadoEmpresa;
    private int idDistrito;
}
