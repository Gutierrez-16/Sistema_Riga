package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.ProvinciaModel;

import java.util.List;

public interface IProvinciaService {
    List<ProvinciaModel> getAllProvincias();
    ProvinciaModel getProvinciaById(int id);
    String insertProvincia(ProvinciaModel provinciaModel);
    String updateProvincia(ProvinciaModel provinciaModel);
    String deleteProvincia(int id);

    List<ProvinciaModel> getProvinciasByDepartamento(int idDepartamento);
}
