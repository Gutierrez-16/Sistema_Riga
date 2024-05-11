package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.DepartamentoModel;

import java.util.List;

public interface IDepartamentoRepository {
    List<DepartamentoModel> getAllDepartamentos();
    DepartamentoModel getDepartamentoById(int id);
    String insertDepartamento(DepartamentoModel departamentoModel);
    String updateDepartamento(DepartamentoModel departamentoModel);
    String deleteDepartamento(int id);
}
