package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.UsuarioModel;
import com.sistema.riga.sistema_riga_backend.repositories.IUsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService implements IUsuarioService{
    @Autowired
    private IUsuarioRepository iUsuarioRepository;

    @Override
    public Long getUserIdIfValid(String logeo, String clave) {
        return iUsuarioRepository.getUserIdIfValid(logeo, clave);
    }

    @Override
    public List<UsuarioModel> getAllUsuarios() {
        return iUsuarioRepository.getAllUsuarios();
    }

    @Override
    public UsuarioModel getUsuarioById(int id) {
        return iUsuarioRepository.getUsuarioById(id);
    }

    @Override
    public String insertUsuario(UsuarioModel usuarioModel) {
        return iUsuarioRepository.insertUsuario(usuarioModel);
    }

    @Override
    public String updateUsuario(UsuarioModel usuarioModel) {
        return iUsuarioRepository.updateUsuario(usuarioModel);
    }

    @Override
    public String deleteUsuario(int id) {
        return iUsuarioRepository.deleteUsuario(id);
    }

    @Override
    public String activateUsuario(int id) {
        return iUsuarioRepository.activateUsuario(id);
    }
}
