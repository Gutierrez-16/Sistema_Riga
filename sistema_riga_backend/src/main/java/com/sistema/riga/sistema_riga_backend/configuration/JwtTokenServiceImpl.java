package com.sistema.riga.sistema_riga_backend.configuration;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static javax.crypto.Cipher.SECRET_KEY;

@Service
public class JwtTokenServiceImpl implements JwtTokenService {

    private List<String> activeTokens = new ArrayList<>();

    public void invalidateToken(String token) {
        activeTokens.remove(token);
    }

    @Override
    public boolean isValidTokenForUser(String token, Long idUsuario) {
        try {
            // Decodificar el token JWT y obtener las reclamaciones (claims) almacenadas en él
            byte[] secretKey = new byte[0];
            Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();

            // Extraer el ID de usuario del token
            Long userIdFromToken = Long.parseLong(claims.getSubject());

            // Verificar si el ID de usuario del token coincide con el ID proporcionado
            return userIdFromToken.equals(idUsuario);
        } catch (Exception e) {
            // Si hay algún error al analizar el token, devuelve false
            return false;
        }
    }


    public boolean isActiveToken(String token) {
        return activeTokens.contains(token);
    }
}
