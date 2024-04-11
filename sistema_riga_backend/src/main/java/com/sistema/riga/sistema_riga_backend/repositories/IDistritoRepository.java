package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.DistritoModel;

import java.util.List;

public interface IDistritoRepository {
    public List<DistritoModel> findAll();
    public int save (DistritoModel distritoModel);
    public int update (DistritoModel distritoModel);
    public int deleteById(int id);
}
