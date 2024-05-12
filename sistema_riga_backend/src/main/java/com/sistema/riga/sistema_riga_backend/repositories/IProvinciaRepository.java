package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.ProvinciaModel;

import java.util.List;

public interface IProvinciaRepository {
    List<ProvinciaModel> getAllProvincias();
    ProvinciaModel getProvinciaById(int id);
    String insertProvincia(ProvinciaModel provinciaModel);
    String updateProvincia(ProvinciaModel provinciaModel);
    String deleteProvincia(int id);
}
