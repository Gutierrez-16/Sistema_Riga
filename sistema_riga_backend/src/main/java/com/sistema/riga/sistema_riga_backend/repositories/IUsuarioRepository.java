package com.sistema.riga.sistema_riga_backend.repositories;

public interface IUsuarioRepository {
    Long getUserIdIfValid(String username, String password);
}
