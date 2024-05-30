package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.TipoUsuarioModel;

import java.util.List;

public interface ITipoUsuarioService {
    List<TipoUsuarioModel> getAllTipoUsuarios();
    TipoUsuarioModel getTipoUsuarioById(int id);
    String insertTipoUsuario(TipoUsuarioModel TipoUsuarioModel);
    String updateTipoUsuario(TipoUsuarioModel TipoUsuarioModel);
    String deleteTipoUsuario(int id);

    String activateTipoUsuario(int id);
}
