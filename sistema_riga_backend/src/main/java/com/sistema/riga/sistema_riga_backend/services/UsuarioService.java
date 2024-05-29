package com.sistema.riga.sistema_riga_backend.services;

import com.sistema.riga.sistema_riga_backend.repositories.IUsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService implements IUsuarioService{
    @Autowired
    private IUsuarioRepository iUsuarioRepository;

    @Override
    public Long getUserIdIfValid(String logeo, String clave) {
        return iUsuarioRepository.getUserIdIfValid(logeo, clave);
    }
}
