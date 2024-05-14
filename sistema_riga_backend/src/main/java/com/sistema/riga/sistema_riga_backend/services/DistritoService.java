package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.DistritoModel;
import com.sistema.riga.sistema_riga_backend.models.ProvinciaModel;
import com.sistema.riga.sistema_riga_backend.repositories.IDistritoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DistritoService implements IDistritoService {

    @Autowired
    private IDistritoRepository iDistritoRepository;

    @Override
    public List<DistritoModel> getAllDistritos() {
        return iDistritoRepository.getAllDistritos();
    }

    @Override
    public DistritoModel getDistritoById(int id) {
        return iDistritoRepository.getDistritoById(id);
    }

    @Override
    public String insertDistrito(DistritoModel distritoModel) {
        return iDistritoRepository.insertDistrito(distritoModel);
    }

    @Override
    public List<DistritoModel> getDistritosByProvincia(int idProvincia) {
        return iDistritoRepository.getDistritosByProvincia(idProvincia);
    }

    @Override
    public String updateDistrito(DistritoModel distritoModel) {
        return iDistritoRepository.updateDistrito(distritoModel);
    }

    @Override
    public String deleteDistrito(int id) {
        return iDistritoRepository.deleteDistrito(id);
    }
}
