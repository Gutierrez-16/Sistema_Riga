package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.ProvinciaModel;
import com.sistema.riga.sistema_riga_backend.repositories.IProvinciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProvinciaService implements IProvinciaService {

    @Autowired
    private IProvinciaRepository provinciaRepository;

    @Override
    public List<ProvinciaModel> getAllProvincias() {
        return provinciaRepository.getAllProvincias();
    }

    @Override
    public ProvinciaModel getProvinciaById(int id) {
        return provinciaRepository.getProvinciaById(id);
    }

    @Override
    public String insertProvincia(ProvinciaModel provinciaModel) {
        return provinciaRepository.insertProvincia(provinciaModel);
    }

    @Override
    public List<ProvinciaModel> getProvinciasByDepartamento(int idDepartamento) {
        return provinciaRepository.getProvinciasByDepartamento(idDepartamento);
    }

    @Override
    public String updateProvincia(ProvinciaModel provinciaModel) {
        return provinciaRepository.updateProvincia(provinciaModel);
    }

    @Override
    public String deleteProvincia(int id) {
        return provinciaRepository.deleteProvincia(id);
    }
}
