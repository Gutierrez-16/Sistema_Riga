package com.sistema.riga.sistema_riga_backend.services;

public interface IUsuarioService {
    Long getUserIdIfValid(String username, String password);
}
