package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.models.UsuarioDataModel;
import com.sistema.riga.sistema_riga_backend.models.UsuarioModel;
import com.sistema.riga.sistema_riga_backend.repositories.IUsuarioDataRepository;
import com.sistema.riga.sistema_riga_backend.repositories.IUsuarioRepository;
import com.sistema.riga.sistema_riga_backend.repositories.UsuarioDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioDataService implements IUsuarioDataService{

    @Autowired
    private IUsuarioDataRepository iUsuarioDataRepository;

    @Override
    public UsuarioDataModel getDataByUsuario(String usuario) {
        return iUsuarioDataRepository.getDataByUsuario(usuario);
    }
}
