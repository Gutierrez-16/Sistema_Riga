package com.sistema.riga.sistema_riga_backend.controllers;

import com.sistema.riga.sistema_riga_backend.models.DepartamentoModel;
import com.sistema.riga.sistema_riga_backend.services.IDepartamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/departamento")
public class DepartamentoController {
    @Autowired
    private IDepartamentoService iDepartamentoService;

    @GetMapping
    public List<DepartamentoModel> getAllDepartamentos() {
        return iDepartamentoService.getAllDepartamentos();
    }

    @GetMapping("/{id}")
    public DepartamentoModel getDepartamentoById(@PathVariable int id) {
        return iDepartamentoService.getDepartamentoById(id);
    }

    @GetMapping("/provincia/{provinciaNombre}")
    public DepartamentoModel getDepartamentoByProvincia(@PathVariable String provinciaNombre) {
        return iDepartamentoService.getDepartamentoByProvincia(provinciaNombre);
    }
}
