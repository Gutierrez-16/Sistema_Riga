package com.sistema.riga.sistema_riga_backend.configuration;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class JwtTokenServiceImpl implements JwtTokenService {

    private List<String> activeTokens = new ArrayList<>();
    private final String SECRET_KEY = "your-256-bit-secret";

    @Override
    public void invalidateToken(String token) {
        activeTokens.remove(token);
    }

    @Override
    public boolean isValidTokenForUser(String token, Long idUsuario) {
        try {
            Claims claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
            Long userIdFromToken = Long.parseLong(claims.getSubject());
            return userIdFromToken.equals(idUsuario) && isActiveToken(token);
        } catch (Exception e) {
            return false;
        }
    }


    public boolean isActiveToken(String token) {
        return activeTokens.contains(token);
    }

    @Override
    public void addActiveToken(String token) {
        activeTokens.add(token);
    }
}
