package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.ProvinciaModel;
import com.sistema.riga.sistema_riga_backend.repositories.IProvinciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProvinciaService implements IProvinciaService {

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
    public List<ProvinciaModel> getProvinciasByDepartamento(int idDepartamento){
        return iProvinciaRepository.getProvinciasByDepartamento(idDepartamento);
    };

    @Override
    public ProvinciaModel getProvinciaByDistrito(int idDistrito) {
        return iProvinciaRepository.getProvinciaByDistrito(idDistrito);
    }
}
