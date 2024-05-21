package com.sistema.riga.sistema_riga_backend.controllers;

import com.sistema.riga.sistema_riga_backend.models.EmpleadoModel;
import com.sistema.riga.sistema_riga_backend.services.IEmpleadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employee")
@CrossOrigin(origins = "http://localhost:5173")
public class EmpleadoController {
    @Autowired
    private IEmpleadoService iEmpleadoService;

    @GetMapping
    public List<EmpleadoModel> getAllEmpleados() {
        return iEmpleadoService.getAllEmpleados();
    }

    @GetMapping("/{id}")
    public EmpleadoModel getEmpleadoById(@PathVariable int id) {
        return iEmpleadoService.getEmpleadoById(id);
    }

    @PostMapping
    public String insertEmpleado(@RequestBody EmpleadoModel empleadoModel) {
        return iEmpleadoService.insertEmpleado(empleadoModel);
    }

    @PutMapping("/{id}")
    public String updateEmpleado(@PathVariable int id, @RequestBody EmpleadoModel empleadoModel) {
        empleadoModel.setIdEmpleado(id);
        return iEmpleadoService.updateEmpleado(empleadoModel);
    }

    @DeleteMapping("/{id}")
    public String deleteEmpleado(@PathVariable int id) {
        return iEmpleadoService.deleteEmpleado(id);
    }
}
