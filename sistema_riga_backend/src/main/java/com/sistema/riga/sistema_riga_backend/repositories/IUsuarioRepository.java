package com.sistema.riga.sistema_riga_backend.repositories;

import com.sistema.riga.sistema_riga_backend.models.UsuarioModel;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;
import java.util.Map;

public interface IUsuarioRepository {

    List<UsuarioModel> getAllUsuarios();
    UsuarioModel getUsuarioById(int id);
    String insertUsuario(UsuarioModel usuarioModel);
    String updateUsuario(UsuarioModel usuarioModel);
    String deleteUsuario(int id);
    String activateUsuario(int id);
    Map<String, Object> authenticateUser(String logeo, String clave) throws Exception;
}
