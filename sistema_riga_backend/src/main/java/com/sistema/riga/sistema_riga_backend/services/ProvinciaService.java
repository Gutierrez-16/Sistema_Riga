package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.ProvinciaModel;
import com.sistema.riga.sistema_riga_backend.repositories.IProvinciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProvinciaService implements IProvinciaService{
    @Autowired
    private IProvinciaRepository iProvinciaRepository;

    @Override
    public List<ProvinciaModel> getAllProvincias() {
        return iProvinciaRepository.getAllProvincias();
    }

    @Override
    public ProvinciaModel getProvinciaById(int id) {
        return iProvinciaRepository.getProvinciaById(id);
    }

    @Override
    public String insertProvincia(ProvinciaModel provinciaModel) {
        return iProvinciaRepository.insertProvincia(provinciaModel);
    }

    @Override
    public String updateProvincia(ProvinciaModel provinciaModel) {
        return iProvinciaRepository.updateProvincia(provinciaModel);
    }

    @Override
    public String deleteProvincia(int id) {
        return iProvinciaRepository.deleteProvincia(id);
    }

}
