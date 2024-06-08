package com.sistema.riga.sistema_riga_backend.controllers;

import com.sistema.riga.sistema_riga_backend.models.TipoUsuarioModel;
import com.sistema.riga.sistema_riga_backend.services.ITipoUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tipousuario")
public class TipoUsuarioController {
    @Autowired
    private ITipoUsuarioService iTipoUsuarioService;

    @GetMapping
    public List<TipoUsuarioModel> getAllTipoUsuarios() {
        return iTipoUsuarioService.getAllTipoUsuarios();
    }

    @GetMapping("/{id}")
    public TipoUsuarioModel getTipoUsuarioById(@PathVariable int id) {
        return iTipoUsuarioService.getTipoUsuarioById(id);
    }

    @PostMapping
    public String insertTipoUsuario(@RequestBody TipoUsuarioModel tipoUsuarioModel) {
        return iTipoUsuarioService.insertTipoUsuario(tipoUsuarioModel);
    }

    @PutMapping("/{id}")
    public String updateTipoUsuario(@PathVariable int id, @RequestBody TipoUsuarioModel tipoUsuarioModel) {
        tipoUsuarioModel.setIdTipoUsuario(id);
        return iTipoUsuarioService.updateTipoUsuario(tipoUsuarioModel);
    }

    @DeleteMapping("/{id}")
    public String deleteTipoUsuario(@PathVariable int id) {
        return iTipoUsuarioService.deleteTipoUsuario(id);
    }

    @PatchMapping("{id}")
    public String activateTipoUsuario(@PathVariable int id){
        return iTipoUsuarioService.activateTipoUsuario(id);
    }
}
