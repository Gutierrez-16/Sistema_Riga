package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.ProvinciaModel;

import java.util.List;

public interface IProvinciaService {
    List<ProvinciaModel> getAllProvincias();
    ProvinciaModel getProvinciaById(int id);
    List<ProvinciaModel> getProvinciasByDepartamento(int idDepartamento);

    ProvinciaModel getProvinciaByDistrito(int idDistrito);
}
