package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.CategoriaModel;

import java.util.List;

public interface ICategoriaRepositry {
    List<CategoriaModel> getAllCategorias();
    CategoriaModel getCategoriaById(int id);
    String insertCategoria(CategoriaModel categoriaModel);
    String updateCategoria(CategoriaModel categoriaModel);
    String deleteCategoria(int id);
    String activateCategoria(int id);
}
