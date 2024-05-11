package com.sistema.riga.sistema_riga_backend.controllers;

import com.sistema.riga.sistema_riga_backend.models.PersonaModel;
import com.sistema.riga.sistema_riga_backend.services.IPersonaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/person")
@CrossOrigin(origins = "http://localhost:5173")
public class PersonaController {
    @Autowired
    private IPersonaService iPersonaService;

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
