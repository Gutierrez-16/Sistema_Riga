package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.UsuarioModel;

import java.util.List;
import java.util.Map;

public interface IUsuarioService {

    Map<String, Object> authenticateUser(String logeo, String clave) throws Exception;
    List<UsuarioModel> getAllUsuarios();
    UsuarioModel getUsuarioById(int id);
    String insertUsuario(UsuarioModel usuarioModel);
    String updateUsuario(UsuarioModel usuarioModel);
    String deleteUsuario(int id);
    String activateUsuario(int id);

}
