package com.sistema.riga.sistema_riga_backend.configuration;


public interface JwtTokenService {
    void invalidateToken(String token);

    boolean isValidTokenForUser(String token, Long idUsuario);
}
