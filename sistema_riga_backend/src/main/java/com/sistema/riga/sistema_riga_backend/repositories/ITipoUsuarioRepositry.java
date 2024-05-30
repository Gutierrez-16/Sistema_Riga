package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.TipoUsuarioModel;

import java.util.List;

public interface ITipoUsuarioRepositry {
    List<TipoUsuarioModel> getAllTipoUsuarios();
    TipoUsuarioModel getTipoUsuarioById(int id);
    String insertTipoUsuario(TipoUsuarioModel tipoUsuarioModel);
    String updateTipoUsuario(TipoUsuarioModel tipoUsuarioModel);
    String deleteTipoUsuario(int id);

    String activateTipoUsuario(int id);
}
