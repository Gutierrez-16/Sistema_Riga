package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.DistritoModel;
import com.sistema.riga.sistema_riga_backend.models.ProvinciaModel;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface IDistritoService {
    List<DistritoModel> getAllDistritos();
    DistritoModel getDistritoById(int id);
    List<DistritoModel> getDistritosByProvincia(int idProvincia);
}
