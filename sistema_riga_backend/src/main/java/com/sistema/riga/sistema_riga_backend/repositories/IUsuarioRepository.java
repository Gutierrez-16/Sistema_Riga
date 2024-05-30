package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.UsuarioModel;

import java.util.List;

public interface IUsuarioRepository {
    Long getUserIdIfValid(String username, String password);
    List<UsuarioModel> getAllUsuarios();
    UsuarioModel getUsuarioById(int id);
    String insertUsuario(UsuarioModel usuarioModel);
    String updateUsuario(UsuarioModel usuarioModel);
    String deleteUsuario(int id);
    String activateUsuario(int id);
}
