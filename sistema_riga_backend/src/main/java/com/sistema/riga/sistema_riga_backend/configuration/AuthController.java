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

            return ResponseEntity.ok(Map.of("token", token));
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    @PostMapping("/logout/{idusuario}")
    public ResponseEntity<?> logout(@PathVariable("idusuario") Long idUsuario, HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        if (tokenService.isValidTokenForUser(token, idUsuario)) {
            // Invalida el token asociado con este usuario
            tokenService.invalidateToken(token);
            return ResponseEntity.ok().build();
        } else {
            // Si el token no es válido para este usuario, devuelve un mensaje de error o un código de estado apropiado
            return ResponseEntity.status(401).body("El token proporcionado no es válido para este usuario");
        }
    }

}
