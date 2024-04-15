package com.sistema.riga.sistema_riga_backend.controllers;

import com.sistema.riga.sistema_riga_backend.models.UsuarioModel;
import com.sistema.riga.sistema_riga_backend.services.IUsuarioService;
import com.sistema.riga.sistema_riga_backend.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {
    @Autowired
    private IUsuarioService iUsuarioService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody UsuarioModel usuarioModel) {
        boolean isValidUser = iUsuarioService.isValidUser(usuarioModel.getUsername(), usuarioModel.getPassword());
        Map<String, Object> response = new HashMap<>();
        HttpStatus httpStatus;

        if (isValidUser) {
            response.put("success", true);
            response.put("message", "Inicio de sesión exitoso");
            httpStatus = HttpStatus.OK;
        } else {
            response.put("success", false);
            response.put("message", "Usuario y/o contraseña incorrectos");
            httpStatus = HttpStatus.UNAUTHORIZED;
        }

        return ResponseEntity.status(httpStatus).body(response);
    }
}
