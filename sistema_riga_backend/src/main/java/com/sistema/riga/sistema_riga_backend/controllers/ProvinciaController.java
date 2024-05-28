package com.sistema.riga.sistema_riga_backend.controllers;

import com.sistema.riga.sistema_riga_backend.models.ProvinciaModel;
import com.sistema.riga.sistema_riga_backend.services.IProvinciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/provincia")
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

    @GetMapping("/departamento/{idDepartamento}")
    public List<ProvinciaModel> getProvinciasByDepartamento(@PathVariable int idDepartamento) {
        return iProvinciaService.getProvinciasByDepartamento(idDepartamento);
    }

    @GetMapping("/distrito/{idDistrito}")
    public ProvinciaModel getProvinciaByDistrito(@PathVariable int idDistrito) {
        return iProvinciaService.getProvinciaByDistrito(idDistrito);
    }
}