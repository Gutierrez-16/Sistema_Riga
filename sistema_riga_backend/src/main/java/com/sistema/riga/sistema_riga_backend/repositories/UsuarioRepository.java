package com.sistema.riga.sistema_riga_backend.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class UsuarioRepository implements IUsuarioRepository{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public int validateUser(String logeo, String clave) {
        String sql = "EXEC SP_LoginUsuario ?, ?";
        int count = jdbcTemplate.queryForObject(sql, Integer.class, logeo, clave);
        return count;
    }
}
