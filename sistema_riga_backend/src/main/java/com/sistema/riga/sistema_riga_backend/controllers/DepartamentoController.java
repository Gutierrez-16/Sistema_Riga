package com.sistema.riga.sistema_riga_backend.controllers;

import com.sistema.riga.sistema_riga_backend.models.DepartamentoModel;
import com.sistema.riga.sistema_riga_backend.services.IDepartamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/department")
@CrossOrigin(origins = "http://localhost:5173")
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

    @PostMapping
    public String insertDepartamento(@RequestBody DepartamentoModel departamentoModel) {
        return iDepartamentoService.insertDepartamento(departamentoModel);
    }

    @PutMapping("/{id}")
    public String updateDepartamento(@PathVariable int id, @RequestBody DepartamentoModel departamentoModel) {
        departamentoModel.setIdDepartamento(id);
        return iDepartamentoService.updateDepartamento(departamentoModel);
    }

    @DeleteMapping("/{id}")
    public String deleteDepartamento(@PathVariable int id) {
        return iDepartamentoService.deleteDepartamento(id);
    }
}
