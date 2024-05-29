package com.sistema.riga.sistema_riga_backend.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class UsuarioRepository implements IUsuarioRepository{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public Long getUserIdIfValid(String logeo, String clave) {
        String sql = "EXEC SP_LoginUsuario1 ?, ?";
        Object[] params = { logeo, clave };
        try {
            return jdbcTemplate.queryForObject(sql, params, Long.class);
        } catch (Exception e) {
            return null;
        }
    }
}
