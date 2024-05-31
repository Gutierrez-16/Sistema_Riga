package com.sistema.riga.sistema_riga_backend.controllers;

import com.sistema.riga.sistema_riga_backend.models.UsuarioModel;
import com.sistema.riga.sistema_riga_backend.security.JwtUtil;
import com.sistema.riga.sistema_riga_backend.security.JwtTokenService;
import com.sistema.riga.sistema_riga_backend.services.IUsuarioService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String logeo = loginRequest.get("username");
        String clave = loginRequest.get("password");

        try {
            Map<String, Object> user = iUsuarioService.authenticateUser( logeo,  clave) ;
            String token = jwtUtil.generateToken(user.get("Logeo").toString(), user.get("NomTipo").toString());

            tokenService.addActiveToken(token); // Agrega el token a la lista de activos

            return ResponseEntity.ok(Map.of("token", token));
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
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
