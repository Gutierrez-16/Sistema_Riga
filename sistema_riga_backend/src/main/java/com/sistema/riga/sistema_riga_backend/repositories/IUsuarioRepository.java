package com.sistema.riga.sistema_riga_backend.repositories;

public interface IUsuarioRepository {
    int validateUser(String username, String password);
}
