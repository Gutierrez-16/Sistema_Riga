package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.CategoriaModel;
import com.sistema.riga.sistema_riga_backend.repositories.ICategoriaRepositry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService implements ICategoriaService {

    @Autowired
    private ICategoriaRepositry iCategoriaRepositry;

    @Override
    public List<CategoriaModel> getAllCategorias() {
        return iCategoriaRepositry.getAllCategorias();
    }

    @Override
    public CategoriaModel getCategoriaById(int id) {
        return iCategoriaRepositry.getCategoriaById(id);
    }

    @Override
    public String insertCategoria(CategoriaModel categoriaModel) {
        return iCategoriaRepositry.insertCategoria(categoriaModel);
    }

    @Override
    public String updateCategoria(CategoriaModel categoriaModel) {
        return iCategoriaRepositry.updateCategoria(categoriaModel);
    }

    @Override
    public String deleteCategoria(int id) {
        return iCategoriaRepositry.deleteCategoria(id);
    }

    @Override
    public String activateCategoria(int id) {
        return iCategoriaRepositry.activateCategoria(id);
    }
}
