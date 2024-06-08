package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.UsuarioDataModel;
import com.sistema.riga.sistema_riga_backend.models.UsuarioModel;

public interface IUsuarioDataService {
    public UsuarioDataModel getDataByUsuario(String usuario);
}
