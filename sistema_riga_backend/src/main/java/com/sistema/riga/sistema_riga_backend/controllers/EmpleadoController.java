package com.sistema.riga.sistema_riga_backend.controllers;

import com.sistema.riga.sistema_riga_backend.models.CargoModel;
import com.sistema.riga.sistema_riga_backend.models.EmpleadoModel;
import com.sistema.riga.sistema_riga_backend.models.PersonaModel;
import com.sistema.riga.sistema_riga_backend.services.IEmpleadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employee")
public class EmpleadoController {
    @Autowired
    private IEmpleadoService iEmpleadoService;

    @GetMapping
    public List<EmpleadoModel> getAllEmpleados() {
        return iEmpleadoService.getAllEmpleados();
    }

    @GetMapping("/cargos")
    public List<CargoModel> getAllCargos() {
        return iEmpleadoService.getAllCargos();
    }

    @GetMapping("/person")
    public List<PersonaModel> getAllPersonas() {
        return iEmpleadoService.getAllPersonas();
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

    @PatchMapping("/{id}")
    public String activateEmpleado(@PathVariable int id) {
        return iEmpleadoService.activateEmpleado(id);
    }
}
