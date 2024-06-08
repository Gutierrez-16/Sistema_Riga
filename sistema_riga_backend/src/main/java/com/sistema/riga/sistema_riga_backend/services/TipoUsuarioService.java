package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.TipoUsuarioModel;
import com.sistema.riga.sistema_riga_backend.repositories.ITipoUsuarioRepositry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TipoUsuarioService implements ITipoUsuarioService {

    @Autowired
    private ITipoUsuarioRepositry iTipoUsuarioRepositry;

    @Override
    public List<TipoUsuarioModel> getAllTipoUsuarios() {
        return iTipoUsuarioRepositry.getAllTipoUsuarios();
    }

    @Override
    public TipoUsuarioModel getTipoUsuarioById(int id) {
        return iTipoUsuarioRepositry.getTipoUsuarioById(id);
    }

    @Override
    public String insertTipoUsuario(TipoUsuarioModel tipoUsuarioModel) {
        return iTipoUsuarioRepositry.insertTipoUsuario(tipoUsuarioModel);
    }

    @Override
    public String updateTipoUsuario(TipoUsuarioModel tipoUsuarioModel) {
        return iTipoUsuarioRepositry.updateTipoUsuario(tipoUsuarioModel);
    }

    @Override
    public String deleteTipoUsuario(int id) {
        return iTipoUsuarioRepositry.deleteTipoUsuario(id);
    }

    @Override
    public String activateTipoUsuario(int id) {
        return iTipoUsuarioRepositry.activateTipoUsuario(id);
    }
}
