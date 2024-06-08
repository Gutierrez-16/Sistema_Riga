package com.sistema.riga.sistema_riga_backend.controllers;

import com.sistema.riga.sistema_riga_backend.models.MarcaModel;
import com.sistema.riga.sistema_riga_backend.services.IMarcaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/marca")
public class MarcaController {
    @Autowired
    private IMarcaService iMarcaService;

    @GetMapping
    public List<MarcaModel> getAllMarcas() {
        return iMarcaService.getAllMarcas();
    }

    @GetMapping("/{id}")
    public MarcaModel getMarcaById(@PathVariable int id) {
        return iMarcaService.getMarcaById(id);
    }

    @PostMapping
    public String insertMarca(@RequestBody MarcaModel marcaModel) {
        return iMarcaService.insertMarca(marcaModel);
    }

    @PutMapping("/{id}")
    public String updateMarca(@PathVariable int id, @RequestBody MarcaModel marcaModel) {
        marcaModel.setIdMarca(id);
        return iMarcaService.updateMarca(marcaModel);
    }

    @DeleteMapping("/{id}")
    public String deleteMarca(@PathVariable int id) {
        return iMarcaService.deleteMarca(id);
    }

    @PatchMapping("/{id}")
    public String activateMarca(@PathVariable int id) {
        return iMarcaService.activateMarca(id);
    }
}
