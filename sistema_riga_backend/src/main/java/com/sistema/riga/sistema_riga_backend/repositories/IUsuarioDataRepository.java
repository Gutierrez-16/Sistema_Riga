package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.UsuarioDataModel;
import com.sistema.riga.sistema_riga_backend.models.UsuarioModel;

public interface IUsuarioDataRepository {

    UsuarioDataModel getDataByUsuario(String usuario);
}
