package com.sistema.riga.sistema_riga_backend.security;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
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
    public boolean isValidTokenForUser(String token, String user) {
        try {
            Claims claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
            String userIdFromToken = claims.getSubject();



            return user.equals(userIdFromToken) && isActiveToken(token);
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
