package com.sistema.riga.sistema_riga_backend.controllers;


import com.sistema.riga.sistema_riga_backend.models.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.jdbc.core.JdbcTemplate; // Recommended for Stored Procedures
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus; // Optional, for building responses
import java.util.Map;

@RestController
@RequestMapping("/login")
public class LoginController {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginRequest request) {
        String sql = "exec Login ?,?";
        Map<String, Object> user = jdbcTemplate.queryForMap(sql, request.getUsername(), request.getPassword());
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(user);
    }
}
