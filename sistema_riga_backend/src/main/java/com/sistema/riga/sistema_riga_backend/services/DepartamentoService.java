package com.sistema.riga.sistema_riga_backend.services;


import com.sistema.riga.sistema_riga_backend.models.DepartamentoModel;
import com.sistema.riga.sistema_riga_backend.repositories.IDepartamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartamentoService implements IDepartamentoService {
    @Autowired
    private IDepartamentoRepository iDepartamentoRepository;

    @Override
    public List<DepartamentoModel> getAllDepartamentos() {
        return iDepartamentoRepository.getAllDepartamentos();
    }

    @Override
    public DepartamentoModel getDepartamentoById(int id) {
        return iDepartamentoRepository.getDepartamentoById(id);
    }

    @Override
    public String insertDepartamento(DepartamentoModel departamentoModel) {
        return iDepartamentoRepository.insertDepartamento(departamentoModel);
    }

    @Override
    public String updateDepartamento(DepartamentoModel departamentoModel) {
        return iDepartamentoRepository.updateDepartamento(departamentoModel);
    }

    @Override
    public String deleteDepartamento(int id) {
        return iDepartamentoRepository.deleteDepartamento(id);
    }

    @Override
    public DepartamentoModel getDepartamentoByProvincia(String provinciaNombre) {
        return iDepartamentoRepository.getDepartamentoByProvincia(provinciaNombre);
    }

}
