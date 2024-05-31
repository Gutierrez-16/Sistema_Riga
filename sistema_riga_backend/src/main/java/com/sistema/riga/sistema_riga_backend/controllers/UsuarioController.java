package com.sistema.riga.sistema_riga_backend.controllers;

import com.sistema.riga.sistema_riga_backend.models.UsuarioModel;
import com.sistema.riga.sistema_riga_backend.security.JwtUtil;
import com.sistema.riga.sistema_riga_backend.security.JwtTokenService;
import com.sistema.riga.sistema_riga_backend.services.IUsuarioService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class UsuarioController {

    @Autowired
    private IUsuarioService iUsuarioService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private JwtTokenService tokenService;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(); // Dependency injection

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody UsuarioModel usuarioModel) {
        Long userId = iUsuarioService.getUserIdIfValid(usuarioModel.getUsername(), usuarioModel.getPassword()); // Use service layer for login logic
        Map<String, Object> response = new HashMap<>();
        HttpStatus httpStatus;

        if (userId != null) {
            String token = jwtUtil.generateToken(userId.toString(), "USER"); // Assuming the role is USER
            tokenService.addActiveToken(token);

            response.put("success", true);
            response.put("message", "Inicio de sesión exitoso");
            response.put("token", token);
            httpStatus = HttpStatus.OK;
        } else {
            response.put("success", false);
            response.put("message", "Usuario y/o contraseña incorrectos");
            httpStatus = HttpStatus.UNAUTHORIZED;
        }

        return ResponseEntity.status(httpStatus).body(response);
    }

    @PostMapping("/logout/{idUsuario}")
    public ResponseEntity<?> logout(@PathVariable("idUsuario") Long idUsuario, HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);
            if (tokenService.isValidTokenForUser(token, idUsuario)) {
                tokenService.invalidateToken(token);
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.status(401).body("El token proporcionado no es válido para este usuario.");
            }
        }
        return ResponseEntity.status(400).body("No se proporcionó un token válido.");
    }

    @GetMapping
    public List<UsuarioModel> getAllUsuarios() {
        return iUsuarioService.getAllUsuarios();
    }

    @GetMapping("/{id}")
    public UsuarioModel getUsuarioById(@PathVariable int id) {
        return iUsuarioService.getUsuarioById(id);
    }

    @PostMapping
    public String insertUsuario(@RequestBody UsuarioModel usuarioModel) {
        String encodedPassword = passwordEncoder.encode(usuarioModel.getPassword()); // Encode password before saving
        usuarioModel.setPassword(encodedPassword);
        return iUsuarioService.insertUsuario(usuarioModel);
    }

    @PutMapping("/{id}")
    public String updateUsuario(@PathVariable int id, @RequestBody UsuarioModel usuarioModel) {
        usuarioModel.setIDUsuario(id);
        String encodedPassword = passwordEncoder.encode(usuarioModel.getPassword()); // Encode password before saving
        usuarioModel.setPassword(encodedPassword);
        return iUsuarioService.updateUsuario(usuarioModel);
    }

    @DeleteMapping("/{id}")
    public String deleteUsuario(@PathVariable int id) {
        return iUsuarioService.deleteUsuario(id);
    }

    @PatchMapping("{id}")
    public String activateUsuario(@PathVariable int id) {
        return iUsuarioService.activateUsuario(id);
    }
}
