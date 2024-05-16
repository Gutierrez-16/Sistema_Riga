package com.sistema.riga.sistema_riga_backend.controllers;

import com.sistema.riga.sistema_riga_backend.models.DepartamentoModel;
import com.sistema.riga.sistema_riga_backend.models.DistritoModel;
import com.sistema.riga.sistema_riga_backend.models.PersonaModel;
import com.sistema.riga.sistema_riga_backend.models.ProvinciaModel;
import com.sistema.riga.sistema_riga_backend.services.IDepartamentoService;
import com.sistema.riga.sistema_riga_backend.services.IDistritoService;
import com.sistema.riga.sistema_riga_backend.services.IPersonaService;
import com.sistema.riga.sistema_riga_backend.services.IProvinciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/person")
@CrossOrigin(origins = "http://localhost:5173")
public class PersonaController {
    @Autowired
    private IPersonaService iPersonaService;

    @Autowired
    private IDepartamentoService iDepartamentoService;

    @Autowired
    private IProvinciaService iProvinciaService;

    @Autowired
    private IDistritoService iDistritoService;

    @GetMapping("/departamentos")
    public List<DepartamentoModel> getAllDepartamentos() {
        return iPersonaService.getAllDepartamentos();
    }

    @GetMapping("/provincias/{idDepartamento}")
    public List<ProvinciaModel> getProvinciasByDepartamento(@PathVariable int idDepartamento) {
        return iPersonaService.getProvinciasByDepartamento(idDepartamento);
    }

    @GetMapping("/distritos/{idProvincia}")
    public List<DistritoModel> getDistritosByProvincia(@PathVariable int idProvincia) {
        return iPersonaService.getDistritosByProvincia(idProvincia);
    }

    @GetMapping
    public List<PersonaModel> getAllPersonas() {
        return iPersonaService.getAllPersonas();
    }

    @GetMapping("/{id}")
    public PersonaModel getPersonaById(@PathVariable int id) {
        return iPersonaService.getPersonaById(id);
    }

    @PostMapping
    public String insertPersona(@RequestBody PersonaModel personaModel) {
        return iPersonaService.insertPersona(personaModel);
    }

    @PutMapping("/{id}")
    public String updatePersona(@PathVariable int id, @RequestBody PersonaModel personaModel) {
        personaModel.setIdPersona(id);
        return iPersonaService.updatePersona(personaModel);
    }

    @DeleteMapping("/{id}")
    public String deletePersona(@PathVariable int id) {
        return iPersonaService.deletePersona(id);
    }
}