package com.sistema.riga.sistema_riga_backend.configuration;

import com.sistema.riga.sistema_riga_backend.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private JwtTokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String logeo = loginRequest.get("username");
        String clave = loginRequest.get("password");

        try {
            Map<String, Object> user = userService.authenticateUser(logeo, clave);
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
                return ResponseEntity.status(401).body("El token proporcionado no es válido para este usuario");
            }
        } else {
            return ResponseEntity.status(400).body("Falta el token de autorización");
        }
    }



}
