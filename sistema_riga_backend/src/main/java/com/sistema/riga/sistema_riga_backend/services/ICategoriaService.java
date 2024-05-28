package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.CategoriaModel;

import java.util.List;

public interface ICategoriaService {
    List<CategoriaModel> getAllCategorias();
    CategoriaModel getCategoriaById(int id);
    String insertCategoria(CategoriaModel categoriaModel);
    String updateCategoria(CategoriaModel categoriaModel);
    String deleteCategoria(int id);
}
