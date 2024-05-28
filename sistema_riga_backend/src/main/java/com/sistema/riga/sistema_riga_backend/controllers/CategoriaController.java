package com.sistema.riga.sistema_riga_backend.controllers;

import com.sistema.riga.sistema_riga_backend.models.CategoriaModel;
import com.sistema.riga.sistema_riga_backend.services.ICategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categoria")
public class CategoriaController {
    @Autowired
    private ICategoriaService iCategoriaService;

    @GetMapping
    public List<CategoriaModel> getAllCategorias() {
        return iCategoriaService.getAllCategorias();
    }

    @GetMapping("/{id}")
    public CategoriaModel getCategoriaById(@PathVariable int id) {
        return iCategoriaService.getCategoriaById(id);
    }

    @PostMapping
    public String insertCategoria(@RequestBody CategoriaModel categoriaModel) {
        return iCategoriaService.insertCategoria(categoriaModel);
    }

    @PutMapping("/{id}")
    public String updateCategoria(@PathVariable int id, @RequestBody CategoriaModel categoriaModel) {
        categoriaModel.setIdCategoria(id);
        return iCategoriaService.updateCategoria(categoriaModel);
    }

    @DeleteMapping("/{id}")
    public String deleteCategoria(@PathVariable int id) {
        return iCategoriaService.deleteCategoria(id);
    }
}
