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
        String sql = "SELECT IDUsuario FROM Usuario WHERE Logeo = ? AND Clave = ?";
        Object[] params = { logeo, clave };
        Integer count = jdbcTemplate.queryForObject(sql, params, Integer.class);
        return count != null ? count.intValue() : 0;
    }

}
