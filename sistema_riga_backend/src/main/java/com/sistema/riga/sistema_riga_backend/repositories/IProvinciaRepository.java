package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.ProvinciaModel;

import java.util.List;

public interface IProvinciaRepository {
    List<ProvinciaModel> getAllProvincias();
    ProvinciaModel getProvinciaById(int id);
    List<ProvinciaModel> getProvinciasByDepartamento(int idDepartamento);

    ProvinciaModel getProvinciaByDistrito(int idDistrito);
}
