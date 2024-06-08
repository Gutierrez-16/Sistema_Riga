package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.MarcaModel;
import com.sistema.riga.sistema_riga_backend.repositories.IMarcaRepositry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarcaService implements IMarcaService {

    @Autowired
    private IMarcaRepositry iMarcaRepositry;

    @Override
    public List<MarcaModel> getAllMarcas() {
        return iMarcaRepositry.getAllMarcas();
    }

    @Override
    public MarcaModel getMarcaById(int id) {
        return iMarcaRepositry.getMarcaById(id);
    }

    @Override
    public String insertMarca(MarcaModel marcaModel) {
        return iMarcaRepositry.insertMarca(marcaModel);
    }

    @Override
    public String updateMarca(MarcaModel marcaModel) {
        return iMarcaRepositry.updateMarca(marcaModel);
    }

    @Override
    public String deleteMarca(int id) {
        return iMarcaRepositry.deleteMarca(id);
    }

    @Override
    public String activateMarca(int id) {
        return iMarcaRepositry.activateMarca(id);
    }
}
