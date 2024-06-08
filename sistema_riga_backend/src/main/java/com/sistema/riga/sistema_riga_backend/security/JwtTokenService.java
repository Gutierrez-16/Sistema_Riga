package com.sistema.riga.sistema_riga_backend.security;

public interface JwtTokenService {
    void invalidateToken(String token);

    boolean isValidTokenForUser(String token, String user);

    boolean isActiveToken(String token);

    void addActiveToken(String token);
}
