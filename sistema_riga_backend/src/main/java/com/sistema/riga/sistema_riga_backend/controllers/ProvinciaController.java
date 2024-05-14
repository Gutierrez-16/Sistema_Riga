package com.sistema.riga.sistema_riga_backend.controllers;

import com.sistema.riga.sistema_riga_backend.models.ProvinciaModel;
import com.sistema.riga.sistema_riga_backend.services.IProvinciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/province")
@CrossOrigin(origins = "http://localhost:5173")
public class ProvinciaController {
    @Autowired
    private IProvinciaService iProvinciaService;

    @GetMapping
    public List<ProvinciaModel> getAllProvincias() {
        return iProvinciaService.getAllProvincias();
    }

    @GetMapping("/{id}")
    public ProvinciaModel getProvinciaById(@PathVariable int id) {
        return iProvinciaService.getProvinciaById(id);
    }

    @GetMapping("/department/{idDepartamento}")
    public List<ProvinciaModel> getProvinciasByDepartamento(@PathVariable int idDepartamento) {
        return iProvinciaService.getProvinciasByDepartamento(idDepartamento);
    }

    @PostMapping
    public String insertProvincia(@RequestBody ProvinciaModel provinciaModel) {
        return iProvinciaService.insertProvincia(provinciaModel);
    }

    @PutMapping("/{id}")
    public String updateProvincia(@PathVariable int id, @RequestBody ProvinciaModel provinciaModel) {
        provinciaModel.setIdDepartamento(id);
        return iProvinciaService.updateProvincia(provinciaModel);
    }

    @DeleteMapping("/{id}")
    public String deleteProvincia(@PathVariable int id) {
        return iProvinciaService.deleteProvincia(id);
    }
}
