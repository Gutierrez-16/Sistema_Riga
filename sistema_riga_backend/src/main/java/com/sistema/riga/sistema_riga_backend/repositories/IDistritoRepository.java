package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.DistritoModel;
import com.sistema.riga.sistema_riga_backend.models.ProvinciaModel;

import java.util.List;

public interface IDistritoRepository {
    List<DistritoModel> getAllDistritos();
    DistritoModel getDistritoById(int id);

    List<DistritoModel> getDistritosByProvincia(int idProvincia);
}
