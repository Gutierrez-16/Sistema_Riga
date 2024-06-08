package com.sistema.riga.sistema_riga_backend.controllers;

import com.sistema.riga.sistema_riga_backend.models.UsuarioDataModel;
import com.sistema.riga.sistema_riga_backend.services.IUsuarioDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/data")
public class UsuarioDataController {

    @Autowired
    private IUsuarioDataService iUsuarioDataService;

    @GetMapping("/{usuario}")
    public UsuarioDataModel getDataByUsuario(@PathVariable String usuario) {
        return iUsuarioDataService.getDataByUsuario(usuario);
    }
}
